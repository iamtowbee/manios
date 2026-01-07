//! # Curds Engine
//!
//! A lightweight 2D game engine for WebAssembly, built with Rust.
//!
//! ## Features
//! - Component-based entity system
//! - Canvas 2D rendering
//! - Input handling (keyboard and mouse)
//! - Sprite rendering and animations
//! - Camera system
//! - Collision detection
//! - Resource management

use wasm_bindgen::prelude::*;

pub mod core;
pub mod rendering;
pub mod input;
pub mod entities;
pub mod math;
pub mod utils;

// Re-exports for convenience
pub use core::{Engine, GameLoop, Time};
pub use rendering::{Renderer, Sprite, Camera, Color};
pub use input::{InputManager, Key, MouseButton};
pub use entities::{Entity, Transform, Component};
pub use math::{Vec2, Rect};

/// Initialize the engine (called from JavaScript)
#[wasm_bindgen(start)]
pub fn init() {
    utils::set_panic_hook();
}

/// Engine version
pub const VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_version() {
        assert!(!VERSION.is_empty());
    }
}
