# cuddly-system
Project for Spring 2016 Marking Period 2 Software Development with Mr. Brown

## Group Members
| **Member** | **Github** | **Role** |
|:----------:|:----------:|:--------:|
| Nellie Spektor | [`@nspektor`] (https://github.com/nspektor) | User Interface |
| Dillon Zhang | [`@dillzhang`] (https://github.com/dillzhang) | Backend JS |

## Assignment
Creating a visual display with multiple moving objects

## Our Take
We decide to use canvas to represent multiple ~~DVD logos~~ Balls bouncing off the walls.
* ~~DVD Logos~~ Balls can be created can be created with a selected velocity and size.
* Their respective data is stored within a table for the user to see.
* ~~DVD Logos~~ Balls run independently of each other.
* ~~DVD Logos~~ Balls can be selected for deletion without affecting the others.

## What's New!
* In addition to changing initial velocity and sizes, one can also the color of a ball.
* One can force balls that exceed a certain speed to change to red (as in bad) using the speed limit option.
* Ball collision is now possible and will respect the properties of elastic collision.
* Changed the driver to be a single function that calls all the balls' draw functions rather than each ball calling their own function.
  * This allowed for clean deletions of the balls and clearing of the screens.
  * A single call to clear screen would replace the deletion of each circle.
* Added in `.map()` and `.filter()` calls.

## Future Additions
* ~~Make DVD Logos collide with each other~~
  * Added optional collision
* ~~Offer different image types~~
  * Removed DVD Logos, but offered different color choices for balls
* Make it look prettier