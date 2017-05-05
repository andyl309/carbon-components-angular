import { ModalService } from "./modal.service";
import {
	Component,
	EventEmitter,
	HostListener,
	Input,
	OnInit,
	Output
} from "@angular/core";
import {
	trigger,
	state,
	style,
	transition,
	animate
} from "@angular/animations";

import { KeyCodes } from "../constant/keys";

@Component({
	selector: "cdl-modal",
	template: `
		<div class="modal-wrapper">
			<cdl-overlay (overlaySelect)="overlaySelected.emit()"></cdl-overlay>
			<div class="valign-wrapper">
				<div class="valign-element">
					<section [@modalState]="modalState" class="modal modal-size-{{size}}">
							<ng-content></ng-content>
					</section>
				</div>
			</div>
		</div>
	`,
	animations: [
		trigger("modalState", [
			state("in", style({opacity: 1, transform: "translate(0, 0)"})),
			state("void", style({transform: "translate(0, 5%)", opacity: 0})),
			transition(":enter", [
				animate("200ms ease-in"),
			]),
			transition(":leave", [
				style({opacity: 1, transform: "translate(0, 0"}),
				animate(200, style({transform: "translate(0, 5%)", opacity: 0}))
			])
		])
	]
})
export class ModalComponent implements OnInit {
	@Input() size = "xl";
	@Output() overlaySelected = new EventEmitter();
	modalState = "out";
	constructor(public modalService: ModalService) { }

	@HostListener("document:keydown", ["$event"])
	handleKeyboardEvent(event: KeyboardEvent) {
		event.stopImmediatePropagation();
		if (event.keyCode === KeyCodes.ESCAPE) {
			this.modalService.destroy();  // destroy top (latest) modal
		}
	}

	ngOnInit() {
		this.modalState = "in";
	}

	ngOnDestroy() {
		this.modalState = "out";
	}
}
