//! Core engine functionality

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{window, HtmlCanvasElement, CanvasRenderingContext2d};
use std::cell::RefCell;
use std::rc::Rc;

use crate::input::InputManager;
use crate::rendering::Renderer;

/// Time management for the game loop
#[wasm_bindgen]
#[derive(Debug, Clone, Copy)]
pub struct Time {
    delta_time: f64,
    total_time: f64,
    frame_count: u64,
}

#[wasm_bindgen]
impl Time {
    pub fn delta_time(&self) -> f64 {
        self.delta_time
    }

    pub fn delta_time_seconds(&self) -> f32 {
        (self.delta_time / 1000.0) as f32
    }

    pub fn total_time(&self) -> f64 {
        self.total_time
    }

    pub fn frame_count(&self) -> u64 {
        self.frame_count
    }

    pub fn fps(&self) -> f32 {
        if self.delta_time > 0.0 {
            (1000.0 / self.delta_time) as f32
        } else {
            0.0
        }
    }
}

impl Time {
    pub fn new() -> Self {
        Self {
            delta_time: 0.0,
            total_time: 0.0,
            frame_count: 0,
        }
    }

    pub fn update(&mut self, current_time: f64) {
        self.delta_time = current_time - self.total_time;
        self.total_time = current_time;
        self.frame_count += 1;
    }
}

/// Trait for game logic implementation
pub trait GameLoop {
    fn update(&mut self, time: &Time, input: &InputManager);
    fn render(&mut self, renderer: &mut Renderer, time: &Time);
}

/// Main engine struct
pub struct Engine {
    canvas: HtmlCanvasElement,
    context: CanvasRenderingContext2d,
    renderer: Renderer,
    input: InputManager,
    time: Time,
    running: bool,
}

impl Engine {
    /// Create a new engine instance
    pub fn new(canvas_id: &str) -> Result<Self, JsValue> {
        let window = window().ok_or("No window found")?;
        let document = window.document().ok_or("No document found")?;

        let canvas = document
            .get_element_by_id(canvas_id)
            .ok_or(format!("Canvas with id '{}' not found", canvas_id))?
            .dyn_into::<HtmlCanvasElement>()?;

        let context = canvas
            .get_context("2d")?
            .ok_or("Failed to get 2d context")?
            .dyn_into::<CanvasRenderingContext2d>()?;

        // Enable crisp pixel rendering
        context.set_image_smoothing_enabled(false);

        let width = canvas.width() as f32;
        let height = canvas.height() as f32;

        let renderer = Renderer::new(context.clone(), width, height);
        let input = InputManager::new(&canvas)?;

        Ok(Self {
            canvas,
            context,
            renderer,
            input,
            time: Time::new(),
            running: false,
        })
    }

    /// Get a reference to the renderer
    pub fn renderer(&mut self) -> &mut Renderer {
        &mut self.renderer
    }

    /// Get a reference to the input manager
    pub fn input(&self) -> &InputManager {
        &self.input
    }

    /// Get a reference to the time
    pub fn time(&self) -> &Time {
        &self.time
    }

    /// Check if the engine is running
    pub fn is_running(&self) -> bool {
        self.running
    }

    /// Update the engine (called from game loop)
    pub fn update(&mut self, current_time: f64) {
        self.time.update(current_time);
        self.input.update();
    }

    /// Start the engine with a game implementation
    pub fn start<G: GameLoop + 'static>(mut self, game: G) -> Result<(), JsValue> {
        self.running = true;

        let engine = Rc::new(RefCell::new(self));
        let game = Rc::new(RefCell::new(game));

        let f = Rc::new(RefCell::new(None));
        let g = f.clone();

        *g.borrow_mut() = Some(Closure::wrap(Box::new(move |time: f64| {
            if !engine.borrow().is_running() {
                return;
            }

            {
                let mut engine = engine.borrow_mut();
                engine.update(time);
            }

            {
                let engine_ref = engine.borrow();
                let mut game = game.borrow_mut();
                game.update(engine_ref.time(), engine_ref.input());
            }

            {
                let time_copy = *engine.borrow().time();
                let mut engine = engine.borrow_mut();
                let mut game = game.borrow_mut();
                game.render(engine.renderer(), &time_copy);
            }

            request_animation_frame(f.borrow().as_ref().unwrap());
        }) as Box<dyn FnMut(f64)>));

        request_animation_frame(g.borrow().as_ref().unwrap());
        Ok(())
    }
}

fn request_animation_frame(f: &Closure<dyn FnMut(f64)>) {
    window()
        .unwrap()
        .request_animation_frame(f.as_ref().unchecked_ref())
        .unwrap();
}
