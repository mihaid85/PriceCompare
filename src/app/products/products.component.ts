import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  data;
  csvContent: string;
  parsedCsv: string[][];

  constructor(private db: AngularFirestore, private http: HttpClient) { }

  ngOnInit() {

    // const input = (document.getElementById('file') as HTMLInputElement);
    // input.addEventListener('change', (event) => {
    //   const files = input.files;
    //   const len = files.length;

    //   if (len) {
    //     console.log('Filename: ' + files[0].name);
    //     console.log('Type: ' + files[0].type);
    //     console.log('Size: ' + files[0].size + ' bytes');

    //   }

    // }, false);
    // this.data = this.readFile();
    // console.log(this.data);


    // const value = {
    //   name: 'aaaaa',
    //   description: 'Hub USB USB 3.1 Type-C HAMA Aluminium 135758, 2x USB-A, USB-C, 3.5 mm audio, argintiuPentru conectarea unui PC / notebook / MacBook / tableta cu USB-C la casti / boxe printr-o mufa jack de 3.5 mm (audio) si simultan conectarea a pana la 3 alte dispoz',
    //   final_price: '109.99',
    //   category: 'Laptop - Desktop - IT',
    //   subcategory: 'Hub USB',
    //   url: 'https://altex.ro%2fhub-usb-usb-3-1-type-c-hama-aluminium-135758-2x-usb-a-usb-c-3-5-mm-audio-argintiu%2fcpd%2fHUB135758',
    //   url_img: 'https://cdna.altex.ro//resize/media/catalog/product/1/3/16fa6a9aef7ffd6209d5fd9338ffa0b1/135758_1_123e61ae.jpg',
    //   SKU: 'HUB135758',
    //   auto_generated: '',
    //   brand: 'HAMA',
    //   in_stock: 'da',
    //   other: '',
    //   original_price: '109.99',
    //   promotion: 'nu'
    // };
    // const result = this.createProduct(value);
    // console.log(result);

  }

  public changeListener(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      const file: File = files.item(0);
      console.log(file.name);
      console.log(file.size);
      console.log(file.type);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const txt: string = reader.result as string;
        console.log(txt);

        const csv = [];
        const lines = txt.split('\n');
        const csvSeparator = ';';
        lines.forEach(element => {
          const cols: string[] = element.split(csvSeparator);
          csv.push(cols);
        });
        this.parsedCsv = csv;
        console.log(this.parsedCsv);
      };
    }
  }

  createProduct(value) {
    console.log('value', value);

    return this.db.collection(new Date().toISOString().replace(/T.*/, '').split('-').reverse().join('-')).add({
      name: value.name,
      description: value.description,
      brand: value.brand,
      category: value.category,
      subcategory: value.subcategory,
      final_price: value.final_price,
      in_stock: value.in_stock,
      original_price: value.original_price,
      url: value.url,
      url_img: value.url_img,
      SKU: value.SKU,
      promotion: value.promotion,
      other: value.other,
      auto_generated: value.auto_generated
    });
  }

}
