Vue.config.debug = true;
Vue.config.devtools = true;
var app = new Vue({
    el: '#app',
    data: {
        modal: false,
        addBookmark: false,
        showProfile: false,
        open: false,
        bookmarks: [
            { url: "https://google.com", title: "Google" },
            { url: "https://microsoft.com", title: "Microsoft" },
            { url: "https://news.ycombinator.com", title: "Hacker News" },
            { url: "https://github.com", title: "Github" },
            { url: "https://stackoverflow.com", title: "Stack Overflow" },
            { url: "https://tailwindcss.com", title: "Tailwind CSS" }
        ],
        bookmark: {
            url: "",
            title: ""
        },
        q: "",
        showMainPage: false
    },
    computed: {
        dataTable: function () {
            if (this.q == "") {
                return this.bookmarks;
            } else {
                $this = this;
                return _.filter(this.bookmarks, function (b) {
                    return b.title.toLowerCase().indexOf($this.q) >= 0 || b.url.toLowerCase().indexOf($this.q) >= 0;
                });
            }
        }
    },
    /* watch: {
        "bookmark.title": function (val) {
            console.log("title changed");
        }
    }, */
    methods: {
        toggleModal() {
            this.modal = !this.modal;
        },
        toggleAddBookmark() {
            this.addBookmark = !this.addBookmark;
        },
        toggleShowProfile() {
            this.showProfile = !this.showProfile;
        },
        toggleNav() {
            this.open = !this.open;
        },
        editTitle(index, e) {
            let text = this.$refs['title-' + index][0].innerText;
            this.bookmarks[index].title = text.replace(/\r?\n|\r/, "");
        },
        editUrl(index) {
            let text = this.$refs['url-' + index][0].innerText;
            this.bookmarks[index].url = text.replace(/\r?\n|\r/, "");
        },
        prevent(e) {
            e.preventDefault();
        },
        /* search(q) {
            this.bookmarks = _.filter(this.bookmarks, function (b) {
                return b.title.toLowerCase().indexOf(q) >= 0 || b.url.toLowerCase().indexOf(q) >= 0;
            });
        }, */
        sort(direction) {
            this.bookmarks = _.orderBy(this.bookmarks, ['title'], [direction]);
        },
        deleteBookmark(index) {
            this.bookmarks.splice(index, 1);
        },
        saveBookmark() {
            this.bookmarks.push(this.bookmark);
            this.bookmark = Object.assign({}, { url: "", title: "" });
            this.addBookmark = !this.addBookmark;
        },
        login() {
            this.showMainPage = true;
            this.modal = !this.modal;

        },
        logout() {
            this.showMainPage = false;
        }
    }
});