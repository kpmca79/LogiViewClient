import { Component, OnInit, Input } from '@angular/core';
import { Form } from "app/model/Form";
import { FormField } from "app/model/FormField";
import { MessagingService } from "app/services/messaging.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'formtitle',
  templateUrl: './formtitle.component.html',
  styleUrls: ['./formtitle.component.css']
})
export class FormtitleComponent implements OnInit {
    @Input() frm:Form;
    @Input() actvieFormField:FormField;
    constructor(private mService: MessagingService) { }

  ngOnInit(): void {
  }
  openCloseRightPanel()
  {
      let obj:any={id:'close'}
      console.log("9999999999999999999999999999")
      this.mService.produce(obj);
  }
  flr_options: Object =
  {
      toolbarInline: true,
      charCounterCount: true,
      height:250,
      imageUploadParam: 'image_param',
      //            imageUploadURL: '/editorImages',
      imageUploadParams: { id: 'my_editor' },
      imageUploadMethod: 'POST',
      quickInsertEnabled: false,
      imageMaxSize: 5 * 1024 * 1024,
      imageAllowedTypes: ['jpeg', 'jpg', 'png'],
      events: {
          'froalaEditor.initialized': function() {
              console.log( 'flr initialized' );
          },
          'froalaEditor.image.beforeUpload': function( e, editor, images ) {

              if ( images.length ) {
                  // Create a File Reader.
                  const reader = new FileReader();
                  // Set the reader to insert images when they are loaded.
                  reader.onload = ( ev ) => {
                      const result = ev.target['result'];
                      editor.image.insert( result, null, null, editor.image.get() );
                      console.log( ev, editor.image, ev.target['result'] )
                  };
                  // Read image as base64.
                  reader.readAsDataURL( images[0] );
              }
              // Stop default upload chain.
              return false;
          }

      }
  }
}
