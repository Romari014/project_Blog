import {HeaderComponent} from './components/headerComponent';
import {NavigationComponent} from './components/navigationComponent';
import {CreateComponent} from './components/createComponent';
import {FavoriteComponent} from './components/favoriteComponent';
import {PostsComponent} from './components/postsComponent';
import {LoaderComponent} from './components/loaderComponent';

new HeaderComponent('header');

const navigation = new NavigationComponent('navigation');
const loader = new LoaderComponent('loader');

const create = new CreateComponent('create');
const favorite = new FavoriteComponent('favorite');
const posts = new PostsComponent('posts', {loader}); //loader: loader

navigation.registerTabs([
    {name: 'create', component: create},
    {name: 'favorite', component: favorite},
    {name: 'posts', component: posts}
])