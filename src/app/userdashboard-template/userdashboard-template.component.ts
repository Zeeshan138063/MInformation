import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http-service';
import swal from 'sweetalert2';
import {Headers, Response, Http} from '@angular/http';
import {User} from '../_models/index';
import {Config} from '../config';
import {Router} from "@angular/router";

@Component({
    selector: 'app-userdashboard-template',
    templateUrl: './userdashboard-template.component.html',
    styleUrls: ['./userdashboard-template.component.scss']
})
export class UserdashboardTemplateComponent implements OnInit {
    currentUser: User;
    user_lists;
    selectedIndex;
    current_dashboard: number = 1;
    loaded: boolean = false;
    selected_choice = '-id';
    choices = [
        {code: 'name', name: 'Name - Ascending'},
        {code: '-name', name: 'Name - Descending'},
        {code: '-created_at', name: 'Newest'},
        {code: 'created_at', name: 'Oldest'},
        {code: '-blog_influencer', name: 'Number of influencers - DSC'},
        {code: 'blog_influencer', name: 'Number of influencers - ASC'},
        // {code: 'AL', name: 'Alabama'},
    ];
    selected_choice_twitter = '-id';
    choices_twitter = [
        {code: 'name', name: 'Name - Ascending'},
        {code: '-name', name: 'Name - Descending'},
        {code: '-created_at', name: 'Newest'},
        {code: 'created_at', name: 'Oldest'},
        {code: '-twitter_influencer', name: 'Number of influencers - DSC'},
        {code: 'twitter_influencer', name: 'Number of influencers - ASC'},
        // {code: 'AL', name: 'Alabama'},
    ];

    constructor(private http: HttpService, private router: Router) {

    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.get_lists(this.selected_choice);
    }

    sort_lists() {
        this.get_lists(this.selected_choice);
    }

    create_empty_list() {

        swal({
            title: 'Enter the name of list',
            text: 'New list will be created',
            type: 'question',
            input: 'text',
            preConfirm: (result) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (result === '') {
                            reject('List name cannot be empty')
                        } else if (result.length > 30) {
                            reject('Length of list name cannot be greater than 30')
                        }
                        else {
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/check_ilist/', JSON.stringify({
                                    name: result,
                                    username: this.currentUser.username
                                }),
                                {headers: headers}).map((response: Response) => response.json()).subscribe(
                                data => {
                                    resolve()

                                },
                                error => {
                                    reject('List named "' + result + '" already exists')

                                });
                        }
                    }, 2)
                })
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            cancelButtonText: 'Cancel'
        }).then((result) => {


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/create_add_ilist/', JSON.stringify({
                    name: result,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists(this.selected_choice);
                    swal(
                        'List created!',
                        result,
                        'success'
                    )
                },
                error => {
                    swal(
                        'Try again after some time!',
                        error.toString(),
                        'error'
                    )
                });

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        })
    }

    get_lists(v) {

        this.loaded = false;
        this.http.get(Config.api + '/get_iList_names/' + this.currentUser.username + '/' + v + '/', null, 'small')
            .subscribe(res => {
                this.user_lists = res.json();
                this.loaded = true;
            });


    }

    select_add_influencers(id: number, name: string, dashboard) {
        // if (dashboard === 1) {
        localStorage.setItem('selected_list', JSON.stringify({id: id, name: name}));
        this.router.navigate(['multi/search'])
        // }
        // else if (dashboard === 6) {
        //
        //     localStorage.setItem('selected_list_dd', JSON.stringify({id: id, name: name}));
        //     this.router.navigate(['blogosphere/search'])
        // }
        // else if (dashboard === 2) {
        //     localStorage.setItem('selected_list_twitter', JSON.stringify({id: id, name: name}));
        //     this.router.navigate(['twitter/search']);
        // }

    }

    go_to_list(e: number, name: string, dashboard) {
        // alert(dashboard)

        this.router.navigate(['blogs/list/', e])

    }

    email_list(e: number, name: string, dashboard) {
        // localStorage.setItem('navigated_list',JSON.stringify({id:e,name:name}));
        // if (dashboard === 1) {
        //
        // } else if (dashboard === 2) {
        //     this.router.navigate(['email/settings/', e])
        //
        // } else if (dashboard === 6) {
        this.router.navigate(['email/settings/', e])
        //
        // }
    }

    delete_list(id: number) {

        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
        headers.append('Content-Type', 'application/json');
        let myhttp = this.http;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this list!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(() => {

            myhttp.delete(Config.api + '/delete_ilist/' + id,
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists(this.selected_choice);

                    swal(
                        'List Deleted!',
                        '',
                        'success'
                    )

                },
                error => {
                    // alert('error')
                    swal(
                        'Try again after some time!',
                        error.toString(),
                        'error'
                    )
                });
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })


    }

    loadTwitterLists(v) {
        // this.current_dashboard = 2;
        this.getTwLists(v);
        // this.load_all_lists(v, this.current_dashboard);

    }

    // load_all_lists(v, dashboard) {
    //     alert(dashboard);
    //     if (dashboard === 1) {
    //         this.get_lists(v.replace('twitter_influencer', 'blog_influencer'));
    //     }
    //
    //     else if (dashboard === 2) {
    //         this.getTwLists(v);
    //
    //     }
    //     else if (dashboard === 6) {
    //         this.get_lists_dd(v.replace('twitter_influencer', 'blog_influencer'));
    //     }
    //
    // }

    getTwLists(v) {
        this.current_dashboard = 2;
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
        headers.append('Content-Type', 'application/json');
        this.loaded = false;
        this.http.get(Config.api + '/ml/get_iList_names_twitter/' + this.currentUser.username + '/' + v + '/', {headers: headers}, 'small')
            .subscribe(res => {
                this.user_lists = res.json();
                this.loaded = true;
            });
    }


    sort_lists_twitter() {

        this.getTwLists(this.selected_choice_twitter);


    }

    create_empty_list_twitter() {
        // let dashboard = this.current_dashboard;
        //
        // if (dashboard === 1) {
        //     this.create_empty_list()
        // }
        // else if (dashboard === 6) {
        //     this.create_empty_list_dd()
        // }
        // else if (dashboard === 2) {
        swal({
            title: 'Enter the name of list',
            text: 'New list will be created',
            type: 'question',
            input: 'text',
            preConfirm: (result) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (result === '') {
                            reject('List name cannot be empty')
                        } else if (result.length > 30) {
                            reject('Length of list name cannot be greater than 30')
                        }
                        else {
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/ml/check_ilist_twitter/', JSON.stringify({
                                    name: result,
                                    username: this.currentUser.username
                                }),
                                {headers: headers}).map((response: Response) => response.json()).subscribe(
                                data => {
                                    resolve()

                                },
                                error => {
                                    reject('List named "' + result + '" already exists')

                                });
                        }
                    }, 2)
                })
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            cancelButtonText: 'Cancel'
        }).then((result) => {


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/ml/create_add_ilist_twitter/', JSON.stringify({
                    name: result,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.loadTwitterLists(this.selected_choice_twitter);
                    swal(
                        'List created!',
                        result,
                        'success'
                    )
                },
                error => {
                    swal(
                        'Try again after some time!',
                        error.toString(),
                        'error'
                    )
                });

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        });
    }

    select_add_influencers_twitter(id: number, name: string) {

        localStorage.setItem('selected_list_twitter', JSON.stringify({id: id, name: name}));
        this.router.navigate(['twitter/search']);

    }

    go_to_list_twitter(e: number, name: string) {
        this.router.navigate(['twitter/list/', e])

    }

    email_list_twitter(e: number, name: string) {


    }

    delete_list_twitter(id: number) {
        // let dashboard = this.current_dashboard;
        //
        // if (dashboard === 1) {
        //     this.delete_list(id);
        // } else if (dashboard === 6) {
        //     alert('blgoooooo')
        //     this.delete_list_dd(id);
        // } else if (dashboard === 2) {
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
        headers.append('Content-Type', 'application/json');
        let myhttp = this.http;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this list!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(() => {

            myhttp.delete(Config.api + '/ml/delete_ilist_twitter/' + id,
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.loadTwitterLists(this.selected_choice_twitter);

                    swal(
                        'List Deleted!',
                        '',
                        'success'
                    )

                },
                error => {
                    // alert('error')
                    swal(
                        'Try again after some time!',
                        error.toString(),
                        'error'
                    )
                });
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })
    }


    sort_lists_dd() {
        this.get_lists_dd(this.selected_choice);
    }

    create_empty_list_dd() {

        swal({
            title: 'Enter the name of list',
            text: 'New list will be created',
            type: 'question',
            input: 'text',
            preConfirm: (result) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (result === '') {
                            reject('List name cannot be empty')
                        } else if (result.length > 30) {
                            reject('Length of list name cannot be greater than 30')
                        }
                        else {
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/check_ilist_dd/', JSON.stringify({
                                    name: result,
                                    username: this.currentUser.username
                                }),
                                {headers: headers}).map((response: Response) => response.json()).subscribe(
                                data => {
                                    resolve()

                                },
                                error => {
                                    reject('List named "' + result + '" already exists')

                                });
                        }
                    }, 2)
                })
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            cancelButtonText: 'Cancel'
        }).then((result) => {


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/create_add_ilist_dd/', JSON.stringify({
                    name: result,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists_dd(this.selected_choice);
                    swal(
                        'List created!',
                        result,
                        'success'
                    )
                },
                error => {
                    swal(
                        'Try again after some time!',
                        error.toString(),
                        'error'
                    )
                });

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        })
    }

    get_lists_dd(v) {
        this.current_dashboard = 6;
        this.loaded = false;
        this.http.get(Config.api + '/get_iList_names_dd/' + this.currentUser.username + '/' + v + '/', null, 'small')
            .subscribe(res => {
                this.user_lists = res.json();
                this.loaded = true;
            });
    }

    select_add_influencers_dd(id: number, name: string) {
        localStorage.setItem('selected_list_dd', JSON.stringify({id: id, name: name}));
        this.router.navigate(['blogosphere/search'])

    }

    go_to_list_dd(e: number, name: string) {

        this.router.navigate(['blogosphere/list/', e])

    }

    email_list_dd(e: number, name: string) {
        // localStorage.setItem('navigated_list',JSON.stringify({id:e,name:name}));
        this.router.navigate(['email/settings/', e])
    }

    delete_list_dd(id: number) {

        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
        headers.append('Content-Type', 'application/json');
        let myhttp = this.http;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this list!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(() => {

            myhttp.delete(Config.api + '/delete_ilist_dd/' + id,
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists_dd(this.selected_choice);

                    swal(
                        'List Deleted!',
                        '',
                        'success'
                    )

                },
                error => {
                    // alert('error')
                    swal(
                        'Try again after some time!',
                        error.toString(),
                        'error'
                    )
                });
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })


    }


    // YOUTUBE

    sort_lists_yt() {
        this.get_lists_yt(this.selected_choice.replace('blog_influencer', 'youtube_influencer'));
    }

    create_empty_list_yt() {

        swal({
            title: 'Enter the name of list',
            text: 'New list will be created',
            type: 'question',
            input: 'text',
            preConfirm: (result) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (result === '') {
                            reject('List name cannot be empty')
                        } else if (result.length > 30) {
                            reject('Length of list name cannot be greater than 30')
                        }
                        else {
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/check_ilist_yt/', JSON.stringify({
                                    name: result,
                                    username: this.currentUser.username
                                }),
                                {headers: headers}).map((response: Response) => response.json()).subscribe(
                                data => {
                                    resolve()

                                },
                                error => {
                                    reject('List named "' + result + '" already exists')

                                });
                        }
                    }, 2)
                })
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            cancelButtonText: 'Cancel'
        }).then((result) => {


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/create_add_ilist_yt/', JSON.stringify({
                    name: result,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists_yt(this.selected_choice.replace('blog_influencer', 'youtube_influencer'));
                    swal(
                        'List created!',
                        result,
                        'success'
                    )
                },
                error => {
                    swal(
                        'Try again after some time!',
                        error.toString(),
                        'error'
                    )
                });

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        })
    }

    get_lists_yt(v) {
        this.current_dashboard = 6;
        this.loaded = false;
        this.http.get(Config.api + '/get_iList_names_yt/' + this.currentUser.username + '/' + v + '/', null, 'small')
            .subscribe(res => {
                this.user_lists = res.json();
                this.loaded = true;
            });
    }

    select_add_influencers_yt(id: number, name: string) {
        localStorage.setItem('selected_list_yt', JSON.stringify({id: id, name: name}));
        this.router.navigate(['youtube/search'])

    }

    go_to_list_yt(e: number, name: string) {

        this.router.navigate(['youtube/list/', e])

    }

    email_list_yt(e: number, name: string) {
        // localStorage.setItem('navigated_list',JSON.stringify({id:e,name:name}));
        this.router.navigate(['email/settings/', e])
    }

    delete_list_yt(id: number) {

        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
        headers.append('Content-Type', 'application/json');
        let myhttp = this.http;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this list!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(() => {

            myhttp.delete(Config.api + '/delete_ilist_yt/' + id,
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists_yt(this.selected_choice.replace('blog_influencer', 'youtube_influencer'));

                    swal(
                        'List Deleted!',
                        '',
                        'success'
                    )

                },
                error => {
                    // alert('error')
                    swal(
                        'Try again after some time!',
                        error.toString(),
                        'error'
                    )
                });
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })


    }






    // INSTAGRAM

    sort_lists_in() {
        this.get_lists_in(this.selected_choice.replace('blog_influencer', 'instagram_influencer'));
    }

    create_empty_list_in() {

        swal({
            title: 'Enter the name of list',
            text: 'New list will be created',
            type: 'question',
            input: 'text',
            preConfirm: (result) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (result === '') {
                            reject('List name cannot be empty')
                        } else if (result.length > 30) {
                            reject('Length of list name cannot be greater than 30')
                        }
                        else {
                            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
                            headers.append('Content-Type', 'application/json');

                            this.http.post(Config.api + '/check_ilist_in/', JSON.stringify({
                                    name: result,
                                    username: this.currentUser.username
                                }),
                                {headers: headers}).map((response: Response) => response.json()).subscribe(
                                data => {
                                    resolve()

                                },
                                error => {
                                    reject('List named "' + result + '" already exists')

                                });
                        }
                    }, 1)
                })
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            cancelButtonText: 'Cancel'
        }).then((result) => {


            let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
            headers.append('Content-Type', 'application/json');

            this.http.post(Config.api + '/create_add_ilist_in/', JSON.stringify({
                    name: result,
                    list: {},
                    username: this.currentUser.username
                }),
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists_in(this.selected_choice.replace('blog_influencer', 'instagram_influencer'));
                    swal(
                        'List created!',
                        result,
                        'success'
                    )
                },
                error => {
                    swal(
                        'Try again after some time!',
                        error.toString(),
                        'error'
                    )
                });

        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'No list created :)',
                    'success'
                )
            }
        })
    }

    get_lists_in(v) {
        this.loaded = false;
        this.http.get(Config.api + '/get_iList_names_in/' + this.currentUser.username + '/' + v + '/', null, 'small')
            .subscribe(res => {
                this.user_lists = res.json();
                this.loaded = true;
            });
    }

    select_add_influencers_in(id: number, name: string) {
        localStorage.setItem('selected_list_in', JSON.stringify({id: id, name: name}));
        this.router.navigate(['instagram/search'])

    }

    go_to_list_in(e: number, name: string) {

        this.router.navigate(['instagram/list/', e])

    }

    email_list_in(e: number, name: string) {
        // localStorage.setItem('navigated_list',JSON.stringify({id:e,name:name}));
        this.router.navigate(['email/settings/', e])
    }

    delete_list_in(id: number) {

        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser['token']});
        headers.append('Content-Type', 'application/json');
        let myhttp = this.http;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this list!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(() => {

            myhttp.delete(Config.api + '/delete_ilist_in/' + id,
                {headers: headers}).map((response: Response) => response.json()).subscribe(
                data => {
                    this.get_lists_in(this.selected_choice.replace('blog_influencer', 'instagram_influencer'));

                    swal(
                        'List Deleted!',
                        '',
                        'success'
                    )

                },
                error => {
                    // alert('error')
                    swal(
                        'Try again after some time!',
                        error.toString(),
                        'error'
                    )
                });
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your list is not deleted :)',
                    'error'
                )
            }
        })


    }

    selectedIndexChange(e) {
        if (e === 0) {
            this.get_lists('-id')
        } else if (e === 1) {
            this.loadTwitterLists('-id');
        } else if (e === 2) {
            this.get_lists_dd('-id');

        } else if (e === 3) {
            this.get_lists_yt('-id');

        } else if (e === 4) {
            this.get_lists_in('-id');

        }


    }

}
