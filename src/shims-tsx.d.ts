import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }

    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }

    // interface ElementAttributesProperty {
    //   $props: any
    // }

    // interface IntrinsicClassAttributes {
    //   ref?: string
    //   id?: string
    //   class?: any
    //   style?: any
    //   key?: any
    //   props?: any
    // }

    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
