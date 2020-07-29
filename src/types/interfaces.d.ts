interface IDrawable
{
  draw(renderer: Renderer): void;
}

interface IObservable
{
  observers: IObservers[]
  notify: () => void;
}
interface IObserver
{
  subscribe: (observer: IObservable) => void;
  update(): () => void;

}
