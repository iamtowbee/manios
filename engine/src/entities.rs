//! Entity and component system

use serde::{Deserialize, Serialize};
use std::any::Any;

use crate::math::{Vec2, Rect};
use crate::rendering::Sprite;

/// Unique entity identifier
pub type EntityId = u64;

/// Transform component for position, rotation, and scale
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Transform {
    pub position: Vec2,
    pub rotation: f32,
    pub scale: Vec2,
}

impl Transform {
    pub fn new(position: Vec2) -> Self {
        Self {
            position,
            rotation: 0.0,
            scale: Vec2::one(),
        }
    }

    pub fn with_scale(mut self, scale: Vec2) -> Self {
        self.scale = scale;
        self
    }

    pub fn with_rotation(mut self, rotation: f32) -> Self {
        self.rotation = rotation;
        self
    }
}

impl Default for Transform {
    fn default() -> Self {
        Self {
            position: Vec2::zero(),
            rotation: 0.0,
            scale: Vec2::one(),
        }
    }
}

/// Trait for components
pub trait Component: Any {
    fn as_any(&self) -> &dyn Any;
    fn as_any_mut(&mut self) -> &mut dyn Any;
}

/// Base entity struct
pub struct Entity {
    pub id: EntityId,
    pub transform: Transform,
    pub sprite: Option<Sprite>,
    pub active: bool,
    components: Vec<Box<dyn Component>>,
}

impl Entity {
    pub fn new(id: EntityId, transform: Transform) -> Self {
        Self {
            id,
            transform,
            sprite: None,
            active: true,
            components: Vec::new(),
        }
    }

    pub fn with_sprite(mut self, sprite: Sprite) -> Self {
        self.sprite = Some(sprite);
        self
    }

    pub fn add_component<T: Component + 'static>(&mut self, component: T) {
        self.components.push(Box::new(component));
    }

    pub fn get_component<T: Component + 'static>(&self) -> Option<&T> {
        for component in &self.components {
            if let Some(c) = component.as_any().downcast_ref::<T>() {
                return Some(c);
            }
        }
        None
    }

    pub fn get_component_mut<T: Component + 'static>(&mut self) -> Option<&mut T> {
        for component in &mut self.components {
            if let Some(c) = component.as_any_mut().downcast_mut::<T>() {
                return Some(c);
            }
        }
        None
    }

    pub fn bounds(&self) -> Option<Rect> {
        self.sprite.as_ref().map(|sprite| {
            Rect::new(
                self.transform.position.x,
                self.transform.position.y,
                sprite.width * self.transform.scale.x,
                sprite.height * self.transform.scale.y,
            )
        })
    }
}

/// Example: Velocity component
#[derive(Debug, Clone)]
pub struct Velocity {
    pub velocity: Vec2,
}

impl Velocity {
    pub fn new(velocity: Vec2) -> Self {
        Self { velocity }
    }
}

impl Component for Velocity {
    fn as_any(&self) -> &dyn Any {
        self
    }

    fn as_any_mut(&mut self) -> &mut dyn Any {
        self
    }
}

/// Example: Collider component
#[derive(Debug, Clone)]
pub struct Collider {
    pub offset: Vec2,
    pub size: Vec2,
}

impl Collider {
    pub fn new(size: Vec2) -> Self {
        Self {
            offset: Vec2::zero(),
            size,
        }
    }

    pub fn with_offset(mut self, offset: Vec2) -> Self {
        self.offset = offset;
        self
    }

    pub fn bounds(&self, transform: &Transform) -> Rect {
        Rect::new(
            transform.position.x + self.offset.x,
            transform.position.y + self.offset.y,
            self.size.x * transform.scale.x,
            self.size.y * transform.scale.y,
        )
    }
}

impl Component for Collider {
    fn as_any(&self) -> &dyn Any {
        self
    }

    fn as_any_mut(&mut self) -> &mut dyn Any {
        self
    }
}

/// Entity manager for handling multiple entities
pub struct EntityManager {
    entities: Vec<Entity>,
    next_id: EntityId,
}

impl EntityManager {
    pub fn new() -> Self {
        Self {
            entities: Vec::new(),
            next_id: 0,
        }
    }

    pub fn create_entity(&mut self, transform: Transform) -> EntityId {
        let id = self.next_id;
        self.next_id += 1;

        let entity = Entity::new(id, transform);
        self.entities.push(entity);
        id
    }

    pub fn get_entity(&self, id: EntityId) -> Option<&Entity> {
        self.entities.iter().find(|e| e.id == id)
    }

    pub fn get_entity_mut(&mut self, id: EntityId) -> Option<&mut Entity> {
        self.entities.iter_mut().find(|e| e.id == id)
    }

    pub fn remove_entity(&mut self, id: EntityId) {
        self.entities.retain(|e| e.id != id);
    }

    pub fn entities(&self) -> &[Entity] {
        &self.entities
    }

    pub fn entities_mut(&mut self) -> &mut [Entity] {
        &mut self.entities
    }

    pub fn clear(&mut self) {
        self.entities.clear();
    }
}

impl Default for EntityManager {
    fn default() -> Self {
        Self::new()
    }
}
