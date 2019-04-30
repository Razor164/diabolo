import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';

export const errFade = trigger('errFade', [
    state('down', style({
        transform: 'translateY(0)',
        opacity: 1,
    })),
    state('up', style({
        transform: 'translateY(-10px)',
        opacity: 0,
        // display: 'none',
    })),
    transition('down <=> up', animate('300ms ease-in-out')),
]);
