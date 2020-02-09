ERROR-1 NOT ABLE TO GENERATE NEW COMPONENT
===========================================================
D:\Angular\LogiViewClient>ng generate component formmodule/form-list
Two or more projects are using identical roots. Unable to determine project using current working directory. Using default workspace project instead.
Two or more projects are using identical roots. Unable to determine project using current working directory. Using default workspace project instead.
More than one module matches. Use skip-import option to skip importing the component into the closest module.

RESOLUTION: ng generate component formmodule/form-list --module app
============================================================================================================


INSTALL CARASUAL
===========================================================
npm install @ng-bootstrap/ng-bootstrap
============================================================================================================

INSTALL GOOGLE CHART
===========================================================
npm install angular-google-charts
============================================================================================================

CKEditor
======================================================
npm install --save @ckeditor/ckeditor5-angular
npm install --save @ckeditor/ckeditor5-build-classic
npm install --save @ckeditor/ckeditor5-build-inline

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
Import in node module
@NgModule( {imports: [CKEditorModule,],} )
insdie index.html
<script src="https://cdn.ckeditor.com/ckeditor5/12.0.0/inline/ckeditor.js"></script>
In component where you want to use
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';


