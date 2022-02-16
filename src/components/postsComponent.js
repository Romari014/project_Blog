import { Component } from "../core/component";
import { apiService } from '../services/api.service';
import { TransformService } from '../services/transform.service';
import { renderPost } from "../templates/postTemplate";


export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id)
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this))
    }

    async onShow() {
        this.loader.show();
        const fbData = await apiService.fetchPosts();
        const posts = TransformService.fbObjectToArray(fbData);
        this.loader.hide();
        const html = posts.map(post => renderPost(post, {withButton: true}));

        this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
    }

    onHide() {
        this.$el.innerHTML = '';
        
    }
}



function buttonHandler(e) {
   const $el = e.target;
   const id = $el.dataset.id;
   const title = $el.dataset.title;


   if(id) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [] //if null it will be empty []
      const candidate = favorites.find(p => p.id === id)

      if (candidate) {
          //delete el
        $el.textContent = 'Сохранить';
        $el.classList.add('button-primary');
        $el.classList.remove('button-danger');
        favorites = favorites.filter(p => p.id != id);
      } else {
          //add el
        $el.textContent = 'Удалить';
        $el.classList.remove('button-primary');
        $el.classList.add('button-danger');
        favorites.push({id,title});
      }

      localStorage.setItem("favorites", JSON.stringify(favorites))
   }

  
}