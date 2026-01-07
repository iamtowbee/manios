//! Utility functions for the engine

use wasm_bindgen::prelude::*;

/// Set up panic hook for better error messages in the browser console
pub fn set_panic_hook() {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

/// Log a message to the console
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    pub fn warn(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    pub fn error(s: &str);
}

/// Macro for logging
#[macro_export]
macro_rules! console_log {
    ($($t:tt)*) => {
        $crate::utils::log(&format!($($t)*))
    };
}

/// Macro for warnings
#[macro_export]
macro_rules! console_warn {
    ($($t:tt)*) => {
        $crate::utils::warn(&format!($($t)*))
    };
}

/// Macro for errors
#[macro_export]
macro_rules! console_error {
    ($($t:tt)*) => {
        $crate::utils::error(&format!($($t)*))
    };
}
