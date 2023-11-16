declare module '*.module.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module 'react-responsive-carousel/lib/js/components/Carousel/index' {
    import { Carousel } from 'react-responsive-carousel';
    export = Carousel;
  }

  declare module 'react-player';