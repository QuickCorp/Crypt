'use strict';
Package('org.quickcorp.custom.controllers',[
  Class('SideNavController',Object,{
  dependencies:[],
  component:null,
  visibility:false,
  effect:null,
  open:function (){
    if (this.effect != null){
      this.effect.apply(this.component.body, 0,1);
    }
    this.component.body.style.width="100%";
    this.component.body.style.overflowX="visible";
    this.component.body.parentElement.subelements('.navbtn')[0].style.display='none';
    this.visibility = true;
    return this.visibility;
  },
  close:function (){
    if (this.effect != null){
      this.effect.apply(this.component.body, 1,0);
    }
    this.component.body.style.width="0px";
    this.component.body.style.overflowX="hidden";
    this.component.body.parentElement.subelements('.navbtn')[0].style.display='block';
    this.visibility = false;
    return this.visibility;
  },
  toggle:function (){
    if (this.visibility){
      this.close();
    } else {
      this.open();
    }
  },
  _new_:function (o){
      this.__new__(o);
      var controller = this;
      waitUntil(function (){
        controller.effect = New(Fade,{duration:300});
      },function (){
        return typeof Fade != 'undefined'
      });
      GLOBAL.sideNavController = this;
      GLOBAL.sideNavController.close();
      //TODO: Implement

    },
    done: function (){
    }
  }),
  Class('EncryptionController',Object,{
    dependencies:[],
    component:null,
    editor:null,
    _new_:function (o){
      this.__new__(o);
      GLOBAL.encryptionController=this;
      //TODO: Implement
    },
    done:function (){
      var controller = this;
      delete this.component.fieldType;
      this.component.createBindingEvents();
      Tag('textarea[codemirror]').map((element)=>{
        controller.editor = CodeMirror.fromTextArea(element, {
          lineNumbers: true,
          styleActiveLine: true,
          matchBrackets: true
        });
//        controller.editor.setOption("theme", "blackboard");
        controller.editor.setOption("mode","javascript");
        controller.editor.on('change',function (editor){
          controller.component.executeBindings();
          controller.component.data.content = editor.getValue();
        })
      });
    },
    submit:function (){
      this.component.data._encoded_ = _Crypt.encrypt(this.component.data.content,this.component.data.passphrase);
      location.href="#result";
    },
    clipboard: function (){
      var controller = this;
      Tag('message').map((element)=>{
        element.innerHTML = 'Copied to clipboard!';
      });
      var clipboard_content = New(Component,{
        name:'clipboard',
        templateURI:'',
        body:document.createElement('input'),
        tplsource:'none'
      });
      clipboard_content.attachIn('body');
      clipboard_content.body.defaultValue = controller.editor.getValue();
      clipboard_content.body.select();
      document.execCommand('copy');
      document.body.removeChild(clipboard_content.body);
      location.href='#resultcopied';

    }
  })

]);
