//! Rendering system for 2D graphics

use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;
use serde::{Deserialize, Serialize};

use crate::math::{Vec2, Rect};

/// RGBA Color
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub struct Color {
    pub r: u8,
    pub g: u8,
    pub b: u8,
    pub a: f32,
}

#[wasm_bindgen]
impl Color {
    #[wasm_bindgen(constructor)]
    pub fn new(r: u8, g: u8, b: u8, a: f32) -> Self {
        Self { r, g, b, a }
    }

    pub fn rgb(r: u8, g: u8, b: u8) -> Self {
        Self { r, g, b, a: 1.0 }
    }

    pub fn white() -> Self {
        Self::rgb(255, 255, 255)
    }

    pub fn black() -> Self {
        Self::rgb(0, 0, 0)
    }

    pub fn red() -> Self {
        Self::rgb(255, 0, 0)
    }

    pub fn green() -> Self {
        Self::rgb(0, 255, 0)
    }

    pub fn blue() -> Self {
        Self::rgb(0, 0, 255)
    }

    pub fn to_css_string(&self) -> String {
        if self.a >= 1.0 {
            format!("rgb({},{},{})", self.r, self.g, self.b)
        } else {
            format!("rgba({},{},{},{})", self.r, self.g, self.b, self.a)
        }
    }

    /// Create color from hex string (#RRGGBB or #RGB)
    pub fn from_hex(hex: &str) -> Result<Self, String> {
        let hex = hex.trim_start_matches('#');

        let (r, g, b) = if hex.len() == 3 {
            let r = u8::from_str_radix(&hex[0..1].repeat(2), 16)
                .map_err(|e| format!("Invalid hex: {}", e))?;
            let g = u8::from_str_radix(&hex[1..2].repeat(2), 16)
                .map_err(|e| format!("Invalid hex: {}", e))?;
            let b = u8::from_str_radix(&hex[2..3].repeat(2), 16)
                .map_err(|e| format!("Invalid hex: {}", e))?;
            (r, g, b)
        } else if hex.len() == 6 {
            let r = u8::from_str_radix(&hex[0..2], 16)
                .map_err(|e| format!("Invalid hex: {}", e))?;
            let g = u8::from_str_radix(&hex[2..4], 16)
                .map_err(|e| format!("Invalid hex: {}", e))?;
            let b = u8::from_str_radix(&hex[4..6], 16)
                .map_err(|e| format!("Invalid hex: {}", e))?;
            (r, g, b)
        } else {
            return Err("Hex color must be 3 or 6 characters".to_string());
        };

        Ok(Self::rgb(r, g, b))
    }
}

/// Camera for viewport management
#[derive(Debug, Clone)]
pub struct Camera {
    pub position: Vec2,
    pub viewport_width: f32,
    pub viewport_height: f32,
}

impl Camera {
    pub fn new(width: f32, height: f32) -> Self {
        Self {
            position: Vec2::zero(),
            viewport_width: width,
            viewport_height: height,
        }
    }

    pub fn world_to_screen(&self, world_pos: &Vec2) -> Vec2 {
        Vec2 {
            x: world_pos.x - self.position.x,
            y: world_pos.y - self.position.y,
        }
    }

    pub fn screen_to_world(&self, screen_pos: &Vec2) -> Vec2 {
        Vec2 {
            x: screen_pos.x + self.position.x,
            y: screen_pos.y + self.position.y,
        }
    }

    pub fn center_on(&mut self, target: &Vec2) {
        self.position = Vec2 {
            x: target.x - self.viewport_width / 2.0,
            y: target.y - self.viewport_height / 2.0,
        };
    }

    pub fn is_visible(&self, rect: &Rect) -> bool {
        let camera_rect = Rect {
            x: self.position.x,
            y: self.position.y,
            width: self.viewport_width,
            height: self.viewport_height,
        };
        camera_rect.intersects(rect)
    }
}

/// Sprite for rendering textures
#[derive(Debug, Clone)]
pub struct Sprite {
    pub width: f32,
    pub height: f32,
    pub color: Color,
}

impl Sprite {
    pub fn new(width: f32, height: f32, color: Color) -> Self {
        Self { width, height, color }
    }
}

/// Main renderer
pub struct Renderer {
    context: CanvasRenderingContext2d,
    width: f32,
    height: f32,
    camera: Camera,
}

impl Renderer {
    pub fn new(context: CanvasRenderingContext2d, width: f32, height: f32) -> Self {
        Self {
            context,
            width,
            height,
            camera: Camera::new(width, height),
        }
    }

    pub fn camera(&self) -> &Camera {
        &self.camera
    }

    pub fn camera_mut(&mut self) -> &mut Camera {
        &mut self.camera
    }

    pub fn clear(&mut self, color: &Color) {
        self.context.set_fill_style(&JsValue::from_str(&color.to_css_string()));
        self.context.fill_rect(0.0, 0.0, self.width as f64, self.height as f64);
    }

    pub fn draw_rect(&mut self, rect: &Rect, color: &Color) {
        let screen_pos = self.camera.world_to_screen(&Vec2::new(rect.x, rect.y));

        self.context.set_fill_style(&JsValue::from_str(&color.to_css_string()));
        self.context.fill_rect(
            screen_pos.x as f64,
            screen_pos.y as f64,
            rect.width as f64,
            rect.height as f64,
        );
    }

    pub fn draw_rect_outline(&mut self, rect: &Rect, color: &Color, line_width: f32) {
        let screen_pos = self.camera.world_to_screen(&Vec2::new(rect.x, rect.y));

        self.context.set_stroke_style(&JsValue::from_str(&color.to_css_string()));
        self.context.set_line_width(line_width as f64);
        self.context.stroke_rect(
            screen_pos.x as f64,
            screen_pos.y as f64,
            rect.width as f64,
            rect.height as f64,
        );
    }

    pub fn draw_circle(&mut self, center: &Vec2, radius: f32, color: &Color) {
        let screen_pos = self.camera.world_to_screen(center);

        self.context.set_fill_style(&JsValue::from_str(&color.to_css_string()));
        self.context.begin_path();
        self.context.arc(
            screen_pos.x as f64,
            screen_pos.y as f64,
            radius as f64,
            0.0,
            2.0 * std::f64::consts::PI,
        ).unwrap();
        self.context.fill();
    }

    pub fn draw_line(&mut self, start: &Vec2, end: &Vec2, color: &Color, width: f32) {
        let screen_start = self.camera.world_to_screen(start);
        let screen_end = self.camera.world_to_screen(end);

        self.context.set_stroke_style(&JsValue::from_str(&color.to_css_string()));
        self.context.set_line_width(width as f64);
        self.context.begin_path();
        self.context.move_to(screen_start.x as f64, screen_start.y as f64);
        self.context.line_to(screen_end.x as f64, screen_end.y as f64);
        self.context.stroke();
    }

    pub fn draw_text(&mut self, text: &str, position: &Vec2, color: &Color, font: &str) {
        let screen_pos = self.camera.world_to_screen(position);

        self.context.set_fill_style(&JsValue::from_str(&color.to_css_string()));
        self.context.set_font(font);
        self.context.fill_text(text, screen_pos.x as f64, screen_pos.y as f64).unwrap();
    }

    pub fn draw_sprite(&mut self, sprite: &Sprite, position: &Vec2) {
        let rect = Rect::new(position.x, position.y, sprite.width, sprite.height);
        self.draw_rect(&rect, &sprite.color);
    }

    pub fn width(&self) -> f32 {
        self.width
    }

    pub fn height(&self) -> f32 {
        self.height
    }
}
