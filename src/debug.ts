import { UpdateEventManager, Game } from "webfront-graphics-core-engine";

const debug = document.querySelector('.debug') as HTMLInputElement;
const fps = document.querySelector('#fps') as HTMLInputElement;
const hideButton = document.querySelector('#hideShow') as HTMLButtonElement;
let isHidden = false;

export const buildDebugDialog = (enable = true) => {
    if (debug && !enable) {
        debug.style.display = "none";
    }
    if (debug) {
        let dragging = false;
        let firstClick = { x: 0, y: 0 };
        const onDown = (event: MouseEvent | Touch) => {
            dragging = true;
            firstClick = {
                x: event.clientX - debug.getBoundingClientRect().left,
                y: event.clientY - debug.getBoundingClientRect().top
            };
        }
    
        const onMove = (event: MouseEvent | Touch) => {
            if (!dragging) {
                return;
            }
    
            const position = {
                x: event.clientX - firstClick.x,
                y: event.clientY - firstClick.y
            };
    
            debug.style.left = `${position.x}px`;
            debug.style.top = `${position.y}px`;
        }
    
        const onUp = () => {
            dragging = false;
        }
    
        debug.addEventListener('mousedown', event => onDown(event));
        document.body.addEventListener('mousemove', event => onMove(event));
        document.body.addEventListener('mouseup', () => onUp());
        debug.addEventListener('touchstart', event => onDown(event.touches[0]));
        document.body.addEventListener('touchmove', event => onMove(event.touches[0]));
        document.body.addEventListener('touchend', () => onUp());
    }
    
    if (fps) {
        setInterval(() => {
            fps.value = UpdateEventManager.getCurrentFPS(
                Game.instance ? Game.instance.updateEventManager : undefined,
                false
            );
        }, 1000);
    }
    
    if (hideButton) {
        hideButton.addEventListener('click', applyHidden);
    }
}

export const applyHidden = () => {
    isHidden = !isHidden;
    hideButton.textContent = isHidden ? 'Show' : 'Hide';
    (document.querySelector('.debug-item:nth-child(2)') as HTMLElement).style.display = isHidden ? 'none' : 'inline-block';
    if (document.querySelector('.debug-item:nth-child(3)'))
        (document.querySelector('.debug-item:nth-child(3)') as HTMLElement).style.display = isHidden ? 'none' : 'inline-block';
}