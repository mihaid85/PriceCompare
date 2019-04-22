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
    product: {};
    productsCollection = {};

    constructor(private db: AngularFirestore, private http: HttpClient) { }

    ngOnInit() {
        let str = "//afftrk.altex.ro/Counter/Click?adsx=y4UWZE+abj3dU692c+4sFg==&rd=https%3a%2f%2faltex.ro%2fsistem-pc-gaming-myria-digital-22-intel-core-i5-8400-pana-la-4ghz-8gb-ssd-240gb-hdd-1tb-nvidia-geforce-gtx-1070-8gb-ubuntu%2fcpd%2fCLCMYRDIGITAL22";
        str = 'https://' + str.split("https%3a%2f%2f").pop();
        str = str.replace('%2f', '/');
        console.log(str);

    }

    changeListener(files: FileList) {
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
                const csvSeparator = '","';
                lines.forEach(element => {
                    const cols: string[] = element.split(csvSeparator);
                    csv.push(cols);
                });
                this.parsedCsv = csv;
                this.parsedCsv.shift();
                this.parsedCsv.pop();
                console.log(this.parsedCsv);
                let url: string;

                this.parsedCsv.forEach((element, index) => {
                    if (index < 100) {
                        url = element[6];
                        url = 'https://' + url.split("https%3a%2f%2f").pop();
                        url = url.replace('%2f', '/');
                        // console.log(url);
                        
                        this.product = {
                            name: element[0],
                            description: element[1],
                            message: element[2],
                            final_price: element[3],
                            category: element[4],
                            subcategory: element[5],
                            url: url,
                            url_img: element[7],
                            SKU: element[8],
                            auto_generated: element[9],
                            brand: element[10],
                            in_stock: element[11],
                            other: element[12],
                            original_price: element[13],
                            promotion: element[14],
                        }
                        // this.productsCollection[index] = this.product;
                        // this.productsCollection.push(this.product);
                        
                        this.createProduct(this.product);
                    }
                });
                // console.log(this.productsCollection);
                // const result = this.createProduct(this.productsCollection);
                // console.log(result);
            };
        }
    }

    createProduct(value) {
        console.log('value', value);

        // return this.db.collection(value.SKU).doc(new Date().toISOString().replace(/T.*/, '').split('-').reverse().join('-')).set(value);

        return this.db.collection(value.SKU).doc(new Date().toISOString().replace(/T.*/, '').split('-').reverse().join('-')).delete();

        // return this.db.collection('products').doc(new Date().toISOString().replace(/T.*/, '').split('-').reverse().join('-')).set(value);
    }

}
