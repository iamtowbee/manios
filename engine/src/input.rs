//! Input handling system

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{HtmlCanvasElement, KeyboardEvent, MouseEvent};
use std::collections::HashSet;
use std::cell::RefCell;
use std::rc::Rc;

use crate::math::Vec2;

/// Keyboard keys
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Key {
    // Letters
    A, B, C, D, E, F, G, H, I, J, K, L, M,
    N, O, P, Q, R, S, T, U, V, W, X, Y, Z,

    // Numbers
    Num0, Num1, Num2, Num3, Num4,
    Num5, Num6, Num7, Num8, Num9,

    // Arrow keys
    ArrowUp, ArrowDown, ArrowLeft, ArrowRight,

    // Special keys
    Space, Enter, Escape, Shift, Control, Alt,
    Tab, Backspace,

    Unknown,
}

impl Key {
    pub fn from_code(code: &str) -> Self {
        match code {
            "KeyA" => Key::A, "KeyB" => Key::B, "KeyC" => Key::C, "KeyD" => Key::D,
            "KeyE" => Key::E, "KeyF" => Key::F, "KeyG" => Key::G, "KeyH" => Key::H,
            "KeyI" => Key::I, "KeyJ" => Key::J, "KeyK" => Key::K, "KeyL" => Key::L,
            "KeyM" => Key::M, "KeyN" => Key::N, "KeyO" => Key::O, "KeyP" => Key::P,
            "KeyQ" => Key::Q, "KeyR" => Key::R, "KeyS" => Key::S, "KeyT" => Key::T,
            "KeyU" => Key::U, "KeyV" => Key::V, "KeyW" => Key::W, "KeyX" => Key::X,
            "KeyY" => Key::Y, "KeyZ" => Key::Z,

            "Digit0" => Key::Num0, "Digit1" => Key::Num1, "Digit2" => Key::Num2,
            "Digit3" => Key::Num3, "Digit4" => Key::Num4, "Digit5" => Key::Num5,
            "Digit6" => Key::Num6, "Digit7" => Key::Num7, "Digit8" => Key::Num8,
            "Digit9" => Key::Num9,

            "ArrowUp" => Key::ArrowUp,
            "ArrowDown" => Key::ArrowDown,
            "ArrowLeft" => Key::ArrowLeft,
            "ArrowRight" => Key::ArrowRight,

            "Space" => Key::Space,
            "Enter" => Key::Enter,
            "Escape" => Key::Escape,
            "ShiftLeft" | "ShiftRight" => Key::Shift,
            "ControlLeft" | "ControlRight" => Key::Control,
            "AltLeft" | "AltRight" => Key::Alt,
            "Tab" => Key::Tab,
            "Backspace" => Key::Backspace,

            _ => Key::Unknown,
        }
    }
}

/// Mouse buttons
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum MouseButton {
    Left,
    Middle,
    Right,
}

impl MouseButton {
    pub fn from_button(button: i16) -> Self {
        match button {
            0 => MouseButton::Left,
            1 => MouseButton::Middle,
            2 => MouseButton::Right,
            _ => MouseButton::Left,
        }
    }
}

/// Input manager state
struct InputState {
    keys_pressed: HashSet<Key>,
    keys_just_pressed: HashSet<Key>,
    keys_just_released: HashSet<Key>,

    mouse_buttons_pressed: HashSet<MouseButton>,
    mouse_buttons_just_pressed: HashSet<MouseButton>,
    mouse_buttons_just_released: HashSet<MouseButton>,

    mouse_position: Vec2,
}

impl InputState {
    fn new() -> Self {
        Self {
            keys_pressed: HashSet::new(),
            keys_just_pressed: HashSet::new(),
            keys_just_released: HashSet::new(),
            mouse_buttons_pressed: HashSet::new(),
            mouse_buttons_just_pressed: HashSet::new(),
            mouse_buttons_just_released: HashSet::new(),
            mouse_position: Vec2::zero(),
        }
    }

    fn clear_frame_state(&mut self) {
        self.keys_just_pressed.clear();
        self.keys_just_released.clear();
        self.mouse_buttons_just_pressed.clear();
        self.mouse_buttons_just_released.clear();
    }
}

/// Input manager for handling keyboard and mouse input
pub struct InputManager {
    state: Rc<RefCell<InputState>>,
    _keydown_closure: Closure<dyn FnMut(KeyboardEvent)>,
    _keyup_closure: Closure<dyn FnMut(KeyboardEvent)>,
    _mousedown_closure: Closure<dyn FnMut(MouseEvent)>,
    _mouseup_closure: Closure<dyn FnMut(MouseEvent)>,
    _mousemove_closure: Closure<dyn FnMut(MouseEvent)>,
}

impl InputManager {
    pub fn new(canvas: &HtmlCanvasElement) -> Result<Self, JsValue> {
        let state = Rc::new(RefCell::new(InputState::new()));

        // Keyboard event handlers
        let keydown_state = state.clone();
        let keydown_closure = Closure::wrap(Box::new(move |event: KeyboardEvent| {
            let key = Key::from_code(&event.code());
            if key != Key::Unknown {
                let mut state = keydown_state.borrow_mut();
                if !state.keys_pressed.contains(&key) {
                    state.keys_just_pressed.insert(key);
                }
                state.keys_pressed.insert(key);
                event.prevent_default();
            }
        }) as Box<dyn FnMut(KeyboardEvent)>);

        let keyup_state = state.clone();
        let keyup_closure = Closure::wrap(Box::new(move |event: KeyboardEvent| {
            let key = Key::from_code(&event.code());
            if key != Key::Unknown {
                let mut state = keyup_state.borrow_mut();
                state.keys_pressed.remove(&key);
                state.keys_just_released.insert(key);
                event.prevent_default();
            }
        }) as Box<dyn FnMut(KeyboardEvent)>);

        // Mouse event handlers
        let mousedown_state = state.clone();
        let mousedown_closure = Closure::wrap(Box::new(move |event: MouseEvent| {
            let button = MouseButton::from_button(event.button());
            let mut state = mousedown_state.borrow_mut();
            if !state.mouse_buttons_pressed.contains(&button) {
                state.mouse_buttons_just_pressed.insert(button);
            }
            state.mouse_buttons_pressed.insert(button);
        }) as Box<dyn FnMut(MouseEvent)>);

        let mouseup_state = state.clone();
        let mouseup_closure = Closure::wrap(Box::new(move |event: MouseEvent| {
            let button = MouseButton::from_button(event.button());
            let mut state = mouseup_state.borrow_mut();
            state.mouse_buttons_pressed.remove(&button);
            state.mouse_buttons_just_released.insert(button);
        }) as Box<dyn FnMut(MouseEvent)>);

        let mousemove_state = state.clone();
        let mousemove_closure = Closure::wrap(Box::new(move |event: MouseEvent| {
            let mut state = mousemove_state.borrow_mut();
            state.mouse_position = Vec2::new(event.offset_x() as f32, event.offset_y() as f32);
        }) as Box<dyn FnMut(MouseEvent)>);

        // Attach event listeners
        canvas.add_event_listener_with_callback("keydown", keydown_closure.as_ref().unchecked_ref())?;
        canvas.add_event_listener_with_callback("keyup", keyup_closure.as_ref().unchecked_ref())?;
        canvas.add_event_listener_with_callback("mousedown", mousedown_closure.as_ref().unchecked_ref())?;
        canvas.add_event_listener_with_callback("mouseup", mouseup_closure.as_ref().unchecked_ref())?;
        canvas.add_event_listener_with_callback("mousemove", mousemove_closure.as_ref().unchecked_ref())?;

        // Focus canvas for keyboard input
        canvas.set_tab_index(0);
        let _ = canvas.focus();

        Ok(Self {
            state,
            _keydown_closure: keydown_closure,
            _keyup_closure: keyup_closure,
            _mousedown_closure: mousedown_closure,
            _mouseup_closure: mouseup_closure,
            _mousemove_closure: mousemove_closure,
        })
    }

    /// Update input state (call once per frame)
    pub fn update(&self) {
        self.state.borrow_mut().clear_frame_state();
    }

    /// Check if a key is currently pressed
    pub fn is_key_pressed(&self, key: Key) -> bool {
        self.state.borrow().keys_pressed.contains(&key)
    }

    /// Check if a key was just pressed this frame
    pub fn is_key_just_pressed(&self, key: Key) -> bool {
        self.state.borrow().keys_just_pressed.contains(&key)
    }

    /// Check if a key was just released this frame
    pub fn is_key_just_released(&self, key: Key) -> bool {
        self.state.borrow().keys_just_released.contains(&key)
    }

    /// Check if a mouse button is currently pressed
    pub fn is_mouse_button_pressed(&self, button: MouseButton) -> bool {
        self.state.borrow().mouse_buttons_pressed.contains(&button)
    }

    /// Check if a mouse button was just pressed this frame
    pub fn is_mouse_button_just_pressed(&self, button: MouseButton) -> bool {
        self.state.borrow().mouse_buttons_just_pressed.contains(&button)
    }

    /// Check if a mouse button was just released this frame
    pub fn is_mouse_button_just_released(&self, button: MouseButton) -> bool {
        self.state.borrow().mouse_buttons_just_released.contains(&button)
    }

    /// Get current mouse position
    pub fn mouse_position(&self) -> Vec2 {
        self.state.borrow().mouse_position
    }
}
