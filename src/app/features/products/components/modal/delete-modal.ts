import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './delete-modal.html',
  styleUrls: ['./delete-modal.scss']
})
export class ConfirmDeleteModalComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
