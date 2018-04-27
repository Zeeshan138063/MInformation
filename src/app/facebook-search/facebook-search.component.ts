import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MdPaginator, MdSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
// import {SelectItem} from 'primeng/primeng';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {Config} from "../config";
import {HttpService} from "../services/http-service";
import {Headers, Response, Http} from '@angular/http';
import * as url from "url";
import swal from 'sweetalert2';

@Component({
  selector: 'app-facebook-search',
  templateUrl: './facebook-search.component.html',
  styleUrls: ['./facebook-search.component.scss']
})
export class FacebookSearchComponent implements OnInit {

    myControl: FormControl = new FormControl();

    options = ["Abortion Service", "Academic Camp", "Accessories", "Accessories Store", "Accountant", "Actor", "Actor/director", "Acupuncturist", "Addiction Resources Center", "Addiction Service", "Addiction Treatment Center", "Adoption Service", "Adult Entertainment Service", "Advertising Agency", "Advertising/Marketing", "Advertising/Marketing Service", "Aerospace Company", "Aerospace/defense", "Afghani Restaurant", "African Restaurant", "Agricultural Cooperative", "Agricultural Service", "Agriculture", "Agriculture Company", "AIDS Resource Center", "Aircraft Dealership", "Airline Company", "Airline Industry Service", "Airport", "Airport Lounge", "Airport Shuttle Service", "Airport Terminal", "Album", "Alcohol Addiction Treatment Center", "Allergist", "Alternative & Holistic Health Service", "Amateur sports team", "Amateur Sport Team", "American Restaurant", "Amusement Center", "Amusement & Theme Park", "Andhra Restaurant", "Anesthesiologists", "Anglican Church", "Animal", "Animal breed", "Animal Shelter", "Antique Store", "Apartment & Condo Building", "Apostolic Church", "Apparel", "Apparel & Clothing", "Apparel Company", "Apparel Distributor", "Appliance Manufacturer", "Appliance Repair Service", "Appliances", "App page", "Aquarium", "Aquatic Pet Store", "Arabian Restaurant", "Arcade", "Archaeological Service", "Archery Range", "Archery Shop", "Architect", "Architectural Designer", "Architectural Engineer", "Argentinian Restaurant", "Armed Forces", "Armenian Restaurant", "Aromatherapy Service", "Art", "Art Gallery", "Artist", "Art Museum", "Art Restoration Service", "Art School", "Arts & Crafts Store", "Arts & Entertainment", "Arts/entertainment/nightlife", "Arts/humanities website", "Arts & Humanities Website", "Art Tour Agency", "Asian Fusion Restaurant", "Asian Restaurant", "Astrologist", "Astrologist & Psychic", "Athlete", "Attractions/things to do", "ATV Dealership", "ATV Recreation Park", "ATV Rental", "ATV Rental Shop", "Auction House", "Audiologist", "Audio Visual Equipment Store", "Auditorium", "Australian Restaurant", "Austrian Restaurant", "Author", "Auto Detailing Service", "Automation Service", "Automobiles and parts", "Automotive", "Automotive, Aircraft & Boat", "Automotive, Aircraft, Boat", "Automotive Body Shop", "Automotive Company", "Automotive Consultant", "Automotive Customization Shop", "Automotive Dealership", "Automotive Glass Service", "Automotive Leasing Service", "Automotive Manufacturer", "Automotive Parts Store", "Automotive Repair Shop", "Automotive Restoration Service", "Automotive Service", "Automotive Shipping Service", "Automotive Storage Facility", "Automotive Store", "Automotive Wholesaler", "Automotive Window Tinting Service", "Aviation", "Aviation School", "Awning Supplier", "Baby & Children's Clothing Store", "Baby Goods/Kids Goods", "Babysitter", "Bags/luggage", "Bags & Luggage Company", "Bags & Luggage Store", "Bail Bondsmen", "Bakery", "Ballroom", "Band", "Bank", "Bank Equipment & Service", "Bank/financial institution", "Bank/Financial Service", "Bank/financial services", "Bankruptcy Lawyer", "Baptist Church", "Bar", "Barbecue Restaurant", "Barber Shop", "Bar & Grill", "Bartending School", "Bartending Service", "Baseball Field", "Basketball Court", "Basque Restaurant", "Batting Cage", "Bavarian Restaurant", "Beach", "Beach Resort", "Beauty", "Beauty, Cosmetic & Personal Care", "Beauty/Cosmetics Company", "Beauty Salon", "Beauty Service", "Beauty Store", "Beauty Supplier", "Beauty Supply Store", "Bed and Breakfast", "Beer Bar", "Beer Garden", "Belgian Restaurant", "Bengali/Bangladeshi Restaurant", "Betting Shop", "Bicycle Rental Shop", "Bicycle Repair Service", "Bicycle Shop", "Big Box Retailer", "Bike Rental", "Bike Trail", "Bingo Hall", "Biotechnology", "Biotechnology Company", "Blacksmith", "Blinds & Curtains Store", "Blogger", "Blood Bank", "Board game", "Boat Dealership", "Boat/Ferry Company", "Boat Rental", "Boat / Sailing Instructor", "Boat Service", "Boat Tour Agency", "Book", "Book & Magazine Distributor", "Book series", "Books & Magazines", "Bookstore", "Book Store", "Borough", "Botanical Garden", "Bottled Water Company", "Bottled Water Supplier", "Boutique Store", "Bowling Alley", "Brand", "Brand Agency", "Brand/Company Type", "Brazilian Restaurant", "Breakfast & Brunch Restaurant", "Brewery", "Bridal Shop", "Bridge", "British Restaurant", "Broadcasting & Media Production Company", "Brokerage", "Brokerage Firm", "Bubble Tea Shop", "Buddhist Temple", "Buffet Restaurant", "Building Materials", "Building Material Store", "Burger Restaurant", "Burmese Restaurant", "Business", "Business Center", "Business Consultant", "Business/economy website", "Business & Economy Website", "Business person", "Business Service", "Business services", "Business Supply Service", "Bus Line", "Bus Station", "Bus Tour Agency", "Butcher Shop", "Cabin", "Cabinet & Countertop Store", "Cable & Satellite Company", "Cafe", "Cafeteria", "Cajun & Creole Restaurant", "Calabrian Restaurant", "Cambodian Restaurant", "Camera/photo", "Camera Store", "Campground", "Campus Building", "Canadian Restaurant", "Canal", "Candy Store", "Canoe & Kayak Rental", "Canoe & Kayak Rental Shop", "Cantonese Restaurant", "Car Dealership", "Cardiologist", "Career Counselor", "Cargo & Freight Company", "Caribbean Restaurant", "Car Rental", "Car Stereo Store", "Car Wash"];

    filteredOptions: Observable<string[]>;



    displayedColumns = ['title', 'category', 'location', 'likes','PTAT','ER','LikeRank',];
    exampleDatabase:ExampleDatabase;
    dataSource: ExampleDataSource | null;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MdSort) sort: MdSort;
    @ViewChild(MdPaginator) paginator: MdPaginator;
    loaded:boolean;
    loading:boolean;
    constructor(private http: HttpService) {

    }
    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges
            .startWith(null)
            .map(val => val ? this.filterCategory(val) : this.options.slice());


        this.exampleDatabase = new ExampleDatabase([{
            "id": '',
            "category": {
                "id": '',
                "name": '',
                "location": ''
            },
            "title": '',
            "link": '',
            "likes": '',
            "PTAT": '',
            "ER": '',
            "LikeRank": '',
            "fb_page_link": ''
        }]);

        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

    }
    handleRowClick(row){
        let url = row['fb_page_link'];
        swal({
            title: 'You&#39;re Leaving This Site!',
            text: 'This is a link to an external site. Click OK to continue to the content (' + url + ').',
            // html: true,
            confirmButtonColor: '#2ecc71',
            showCancelButton: true,

        }).then(() => {

            window.open(url);


        }, (dismiss) => {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                // localStorage.removeItem('selected_list_twitter');

                swal(
                    'Cancelled',
                    '',
                    'success'
                )
            }
        });
    }
    filterCategory(val: string): string[] {
        return this.options.filter(option =>
            option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
    getFbPages(e) {
        this.loaded = false;
        this.loading = true;
      console.log(e['option']['value']);
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        let headers = new Headers({'Authorization': 'JWT ' + currentUser.token});
        headers.append('Content-Type', 'application/json');
        this.http.get(Config.api + '/ml/fbpages/' + e['option']['value'] + '/', {headers: headers}, 'small')
            .subscribe(res => {
                this.loaded = true;
                this.loading = false;
                this.exampleDatabase = new ExampleDatabase(res.json());

                this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);


                Observable.fromEvent(this.filter.nativeElement, 'keyup')
                    .debounceTime(150)
                    .distinctUntilChanged()
                    .subscribe(() => {
                        if (!this.dataSource) { return; }
                        this.dataSource.filter = this.filter.nativeElement.value;
                    });
                //
                // this.main_checkbox = false;
                //
                // this.blogs = res.json();
                // console.log(this.blogs);

            });
    }

}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
    'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
    title: string;
    category: string;
    location: string;
    likes: string;
    PTAT: string;
    ER: string;
    LikeRank: string;
    fb_page_link: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
    get data(): UserData[] { return this.dataChange.value; }

    constructor(fb_data) {
        // Fill up the database with 100 users.
        for (let ob of fb_data) { this.addUser(ob); }
    }

    /** Adds a new user to the database. */
    addUser(ob) {
      // console.log(ob)
        const copiedData = this.data.slice();
        copiedData.push(this.createNewUser(ob));
        this.dataChange.next(copiedData);
    }

    /** Builds and returns a new User. */
    private createNewUser(ob) {


        return {
            title: ob['title'],
            category: ob['category']['name'],
            location: ob['category']['location'],
            likes: ob['likes'],
            PTAT:ob['PTAT'],
            ER:ob['ER'],
            LikeRank:ob['LikeRank'],
            fb_page_link:ob['fb_page_link']
        };
    }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }
    constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MdPaginator, private _sort: MdSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<UserData[]> {
        let displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._filterChange,
            this._paginator.page,
            this._sort.mdSortChange,
        ];

        // return Observable.merge(...displayDataChanges).map(() => {
        //     return this.getSortedData();
        // });
        return Observable.merge(...displayDataChanges).map(() => {
            let data = this.getSortedData().slice();

            // Grab the page's slice of data.
            let startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return data.slice().filter((item: UserData) => {
                let searchStr = (item.likes+item.location+item.ER+item.title).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) != -1;
            }).splice(startIndex, this._paginator.pageSize);

            // return data.splice(startIndex, this._paginator.pageSize);
        });
    }

    disconnect() {}

    /** Returns a sorted copy of the database data. */
    getSortedData(): UserData[] {
        let data = this._exampleDatabase.data.slice();
        if (!this._sort.active || this._sort.direction == '') { return data; }

        return data.sort((a, b) => {
            let propertyA: number|string;
            let propertyB: number|string;

            switch (this._sort.active) {
                case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
                case 'userName': [propertyA, propertyB] = [a.category, b.category]; break;
                case 'location': [propertyA, propertyB] = [a.location, b.location]; break;
                case 'likes': [propertyA, propertyB] = [parseFloat(a.likes.replace(",","")), parseFloat(b.likes.replace(",",""))]; break;
                case 'PTAT': [propertyA, propertyB] = [parseFloat(a.PTAT.replace(",","")), parseFloat(b.PTAT.replace(",",""))]; break;
                case 'ER': [propertyA, propertyB] = [parseFloat(a.ER.replace(",","").replace('%','')), parseFloat(b.ER.replace(",",""))]; break;
                case 'LikeRank': [propertyA, propertyB] = [parseFloat(a.LikeRank.replace(",","")), parseFloat(b.LikeRank.replace(",",""))]; break;
                // case 'likes': [propertyA, propertyB] = [a.likes, b.likes]; break;
            }

            let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
        });
    }
}
//access ID token mozscape-f1225f2e5e
// secret key 428f246675d4d98258bc37e77c39f383