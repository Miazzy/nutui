import Dialog from './index.vue';
import { render, createVNode, h } from 'vue';
export class DialogOptions {
  title?: string = '';
  content?: string = '';
  cancelText?: string = '取消';
  okText?: string = '确定';
  textAlign?: string = 'center';
  teleport?: String = 'body';

  // function
  onUpdate?: Function = (value: boolean) => {};
  onOk?: Function = () => {};
  onCancel?: Function = () => {};
  onClose?: Function = () => {};
  onClosed?: Function = () => {};

  visible?: boolean = true;
  noFooter?: boolean = false;
  noOkBtn?: boolean = false;
  noCancelBtn?: boolean = false;
  okBtnDisabled?: boolean = false;
  closeOnPopstate?: boolean = false;
  lockScroll?: boolean = false;
}

class DialogFunction {
  options: DialogOptions = new DialogOptions();

  constructor(_options: DialogOptions) {
    let options = Object.assign(this.options, _options);
    const root = document.createElement('view');
    root.id = 'dialog-' + new Date().getTime();
    const Wrapper = {
      setup() {
        options.onUpdate = (val: boolean) => {
          if (val == false) {
            document.body.removeChild(root);
          }
        };
        options.teleport = `#${root.id}`;
        return () => {
          return h(Dialog, options);
        };
      }
    };
    const instance: any = createVNode(Wrapper);
    document.body.appendChild(root);
    render(instance, root);
  }

  close = () => {
    // if (instance) {
    //   instance.component.ctx.close();
    // }
  };

  setDefaultOptions = (options: DialogOptions) => {
    // Object.assign(this.currentOptions, options);
  };

  resetDefaultOptions = () => {
    // Dialog.currentOptions = { ...Dialog.defaultOptions };
  };
}

const _Dialog = function(options: DialogOptions) {
  return new DialogFunction(options);
};
_Dialog.install = (app: any) => {
  app.use(Dialog);
  app.config.globalProperties.$dialog = _Dialog;
};
export { Dialog };
export default _Dialog;
