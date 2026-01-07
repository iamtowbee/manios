//! Math utilities and types for 2D game development

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

// Re-export glam types
pub use glam::{Vec2 as GlamVec2, Vec3, Vec4, Mat3, Mat4};

/// 2D Vector with WASM bindings
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub struct Vec2 {
    pub x: f32,
    pub y: f32,
}

#[wasm_bindgen]
impl Vec2 {
    #[wasm_bindgen(constructor)]
    pub fn new(x: f32, y: f32) -> Self {
        Self { x, y }
    }

    pub fn zero() -> Self {
        Self { x: 0.0, y: 0.0 }
    }

    pub fn one() -> Self {
        Self { x: 1.0, y: 1.0 }
    }

    pub fn length(&self) -> f32 {
        (self.x * self.x + self.y * self.y).sqrt()
    }

    pub fn normalize(&self) -> Self {
        let len = self.length();
        if len > 0.0 {
            Self {
                x: self.x / len,
                y: self.y / len,
            }
        } else {
            Self::zero()
        }
    }

    pub fn distance_to(&self, other: &Vec2) -> f32 {
        let dx = self.x - other.x;
        let dy = self.y - other.y;
        (dx * dx + dy * dy).sqrt()
    }

    pub fn dot(&self, other: &Vec2) -> f32 {
        self.x * other.x + self.y * other.y
    }

    pub fn add(&self, other: &Vec2) -> Vec2 {
        Vec2 {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }

    pub fn sub(&self, other: &Vec2) -> Vec2 {
        Vec2 {
            x: self.x - other.x,
            y: self.y - other.y,
        }
    }

    pub fn mul_scalar(&self, scalar: f32) -> Vec2 {
        Vec2 {
            x: self.x * scalar,
            y: self.y * scalar,
        }
    }
}

impl From<GlamVec2> for Vec2 {
    fn from(v: GlamVec2) -> Self {
        Self { x: v.x, y: v.y }
    }
}

impl From<Vec2> for GlamVec2 {
    fn from(v: Vec2) -> Self {
        GlamVec2::new(v.x, v.y)
    }
}

/// Rectangle for collision detection and bounds
#[wasm_bindgen]
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub struct Rect {
    pub x: f32,
    pub y: f32,
    pub width: f32,
    pub height: f32,
}

#[wasm_bindgen]
impl Rect {
    #[wasm_bindgen(constructor)]
    pub fn new(x: f32, y: f32, width: f32, height: f32) -> Self {
        Self { x, y, width, height }
    }

    pub fn contains_point(&self, point: &Vec2) -> bool {
        point.x >= self.x
            && point.x <= self.x + self.width
            && point.y >= self.y
            && point.y <= self.y + self.height
    }

    pub fn intersects(&self, other: &Rect) -> bool {
        self.x < other.x + other.width
            && self.x + self.width > other.x
            && self.y < other.y + other.height
            && self.y + self.height > other.y
    }

    pub fn center(&self) -> Vec2 {
        Vec2 {
            x: self.x + self.width / 2.0,
            y: self.y + self.height / 2.0,
        }
    }
}

/// Linear interpolation
pub fn lerp(a: f32, b: f32, t: f32) -> f32 {
    a + (b - a) * t
}

/// Clamp a value between min and max
pub fn clamp(value: f32, min: f32, max: f32) -> f32 {
    if value < min {
        min
    } else if value > max {
        max
    } else {
        value
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_vec2_operations() {
        let v1 = Vec2::new(3.0, 4.0);
        assert_eq!(v1.length(), 5.0);

        let v2 = Vec2::new(1.0, 0.0);
        assert_eq!(v1.dot(&v2), 3.0);
    }

    #[test]
    fn test_rect_intersection() {
        let r1 = Rect::new(0.0, 0.0, 10.0, 10.0);
        let r2 = Rect::new(5.0, 5.0, 10.0, 10.0);
        assert!(r1.intersects(&r2));

        let r3 = Rect::new(20.0, 20.0, 10.0, 10.0);
        assert!(!r1.intersects(&r3));
    }
}
