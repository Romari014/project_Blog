import { Component } from "../core/component";
import { apiService } from '../services/api.service';
import { TransformService } from '../services/transform.service';

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
        const html = posts.map(post => renderPost(post));

        this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
    }

    onHide() {
        this.$el.innerHTML = '';
        
    }
}

function renderPost(post) {
    const tag = post.type === 'news'
        ? '<li class="tag tag-blue tag-rounded">Новость</li>'
        : '<li class="tag  tag-rounded">Заметка</li>';
    
    const button = (JSON.parse(localStorage.getItem('favorites')) || []).includes(post.id)
    ?`<button class="button-round button-small button-danger" data-id="${post.id}">Удалить</button>`
    : `<button class="button-round button-small button-primary" data-id="${post.id}">Сохранить</button>`

    return `
        <div class="panel">
        <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
            ${tag}
        </ul>
        </div>
        <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
        </div>
        <div class="panel-footer w-panel-footer">
        <small>${post.date}</small>
        ${button}
        </div>
    </div>
    `
}

function buttonHandler(e) {
   const $el = e.target;
   const id = $el.dataset.id;
   const title = $el.title;


   if(id) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [] //if null it will be empty []

      if (favorites.includes(id)) {
          //delete el
        $el.textContent = 'Сохранить';
        $el.classList.add('button-primary');
        $el.classList.remove('button-danger');
        favorites = favorites.filter(fId => fId != id);
      } else {
          //add el
        $el.textContent = 'Удалить';
        $el.classList.remove('button-primary');
        $el.classList.add('button-danger');
        favorites.push(id);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites))
   }

   if(title) {
    let postName = JSON.parse(localStorage.getItem('postName')) || []

    if (postName.includes(title)) {
        //delete el
      postName = postName.filter(fName => fName != title)
    } else {
        //add el
      postName.push(title);

    }

    localStorage.setItem("postName", JSON.stringify(postName))
 }
}