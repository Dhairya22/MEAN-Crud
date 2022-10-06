import { Component, OnDestroy } from "@angular/core";
import { Subject } from 'rxjs';

@Component({
    template: ''
})

export class SubscriptionDisposer implements OnDestroy {

    destroyed$ = new Subject();

    ngOnDestroy(): void {
        this.destroyed$.unsubscribe();
    }
}