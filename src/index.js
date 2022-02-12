import {HeaderComponent} from './components/headerComponent';
import {NavigationComponent} from './components/navigationComponent';
import {CreateComponent} from './components/createComponent';
import {FavoriteComponent} from './components/favoriteComponent';
import {PostsComponent} from './components/postsComponent';

new HeaderComponent('header');

const navigation = new NavigationComponent('navigation');

const create = new CreateComponent('create');
const favorite = new FavoriteComponent('favorite');
const posts = new PostsComponent('posts');

navigation.registerTabs([
    {name: 'create', component: create},
    {name: 'favorite', component: favorite},
    {name: 'posts', component: posts}
])