import { Routes } from '@angular/router';
import { PageInfoComponent } from './page-info/page-info.component';
import { TimetablePageComponent } from './page-timetable/timetable-page.component';
import { PageFavoritesComponent } from './page-favorites/page-favorites.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'schema'
    }, {
        path: 'schema',
        component: TimetablePageComponent
    },
    {
        path: 'info',
        component: PageInfoComponent
    },
    {
        path: 'favorieten',
        component: PageFavoritesComponent
    }
];
