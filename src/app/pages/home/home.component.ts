import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  closeResult = '';
  selectedTable: any;
  selTimeSlot: string = '';
  message: string = '';
  enableSave: boolean = false;
  tableDetails: any = [
    { tableId: 1, noOfPerson: 4, bookingStatus: ['12:00 PM - 2:00 PM'] },
    { tableId: 2, noOfPerson: 8, bookingStatus: [] },
    { tableId: 3, noOfPerson: 4, bookingStatus: ['6:00 PM - 8:00 PM', '8:00 PM - 10:00 PM'] },
    { tableId: 4, noOfPerson: 6, bookingStatus: ['12:00 PM - 2:00 PM', '2:00 PM - 4:00 PM'] },
    { tableId: 5, noOfPerson: 4, bookingStatus: [] },
    { tableId: 6, noOfPerson: 2, bookingStatus: ['2:00 PM - 4:00 PM', '6:00 PM - 8:00 PM'] },
    { tableId: 7, noOfPerson: 4, bookingStatus: [] }
  ]

  timeSlots: any = ['12:00 PM - 2:00 PM', '2:00 PM - 4:00 PM', '6:00 PM - 8:00 PM', '8:00 PM - 10:00 PM']

  constructor(private modalService: NgbModal) { }

  showBookingStatus(content: any, selectedTableObj: any) {
    this.enableSave = false;
    this.selectedTable = selectedTableObj;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  bookTable() {
    this.message = '';
    this.selectedTable['bookingStatus'].push(this.selTimeSlot);
    this.enableSave = false;
  }

  selectedTimeSlot(selTimeSlotObj: any) {
    this.message = '';
    var isPresent = this.selectedTable['bookingStatus'].some(function (el) { return el === selTimeSlotObj });
    console.log(selTimeSlotObj)
    if (isPresent) {
      this.enableSave = false;
      this.message = "This slot is already booked.";
    } else {
      this.enableSave = true;
      this.selTimeSlot = selTimeSlotObj;
      this.message = "This slot is available.";
    }
  }
}
