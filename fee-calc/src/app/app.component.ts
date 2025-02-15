import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  formGroup = new FormGroup({
    fee: new FormControl(0),
  });

  final = 0;

  ngOnInit(): void {
    this.formGroup
      .get('fee')
      ?.valueChanges.pipe(filter((x) => x !== null))
      .subscribe((res) => {
        this.final = this.calculateGoogleAdsFee(res);
      });
  }

  calculateGoogleAdsFee(amount: number): number {
    let fee = 0;
    let remaining = amount;

    if (remaining > 0) {
      const tierAmount = Math.min(remaining, 50_000_000);
      let tierFee = tierAmount * 0.05;
      tierFee = Math.min(Math.max(tierFee, 500_000), 1_500_000);
      fee += tierFee;
      remaining -= tierAmount;
    }

    if (remaining > 0) {
      const tierAmount = Math.min(remaining, 40_000_000);
      let tierFee = tierAmount * 0.03;
      tierFee = Math.min(Math.max(tierFee, 500_000), 1_000_000);
      fee += tierFee;
      remaining -= tierAmount;
    }

    while (remaining > 0) {
      const tierAmount = Math.min(remaining, 30_000_000);
      let tierFee = tierAmount * 0.01;
      tierFee = Math.min(Math.max(tierFee, 50_000), 200_000);
      fee += tierFee;
      remaining -= tierAmount;
    }

    return fee;
  }
}
