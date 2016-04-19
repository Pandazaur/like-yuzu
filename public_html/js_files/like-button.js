var likeButton = Vue.extend({
    template:
        `<div>
        <div class="card" v-on:click="addLike">
            <div class="card-left">
                <div class="card-icon">
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                    </svg>
                </div>
                <div class="card-likes">
                    {{nbLikes}}
                </div>
            </div>
            <div class="card-right">
                {{likeSentence}}
            </div>
        </div>
        </div>`,
    props: ['width'],
    data: function(){
        return {
            nbLikes:  '.',
            likeSentence: 'Like !',
            canLike: false,
        }
    },
    created: function () {
        var self = this;
        //_Récupération des infos (nb likes + possibilité de like)
        this.checkPageInfo( function (data) {
            self.nbLikes = data.nbLikes;
            self.canLike = data.canLike;

            if(data.canLike === true)
                self.likeSentence = 'Like !';
            else
                self.likeSentence = 'You Like This Page !';
        });
    },
    methods: {
        ////////////////////////////////////////////////////////////////////////
        addLike: function () {
            var self = this;
            var url = window.location.href;

            if(this.canLike === true) {
                //_Like la page
                jQuery.ajax({
                    method: 'POST',
                    url: `http://${IP_SERVER}:${PORT_SERVER}/api/page/like/`,
                    data: {page: url},
                    success: function () {
                        self.nbLikes++;
                        self.likeSentence = 'You like this page !'
                        self.canLike = false;
                    },
                    error: function (err) {
                        console.error(err);
                    }
                });
            } else {
                alert('Vous aimez déjà cette page !');
            }
        },
        ////////////////////////////////////////////////////////////////////////
        checkPageInfo: function (callback) {
            var _nbLikes = null;
            var _canLike = null;
            var url = window.location.href;

            //_On récupère le nombre de like pour cette page
            jQuery.ajax({
                method: 'POST',
                url: `http://${IP_SERVER}:${PORT_SERVER}/api/page/likes/`,
                data: {page: url},
                success: function (data) {
                    _nbLikes = data.totalLike;
                },
                error: function (err) {
                    console.log(err);
                    _nbLikes = '?';
                }
            }).done( function () {
                //_Récupération de la possibilité de like
                jQuery.ajax({
                    method: 'POST',
                    url: `http://${IP_SERVER}:${PORT_SERVER}/api/can-like/`,
                    data: {page: url},
                    success: function (data) {
                        _canLike = data.canLike;
                    },
                    error: function (err) {
                        _canLike = false;
                    }
                }).done( function () {
                    callback({canLike: _canLike, nbLikes: _nbLikes})
                });
            });
        }
    }
});

Vue.component('like', likeButton);

new Vue({
    el: 'body'
});