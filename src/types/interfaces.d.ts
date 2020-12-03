interface IDrawable {
  draw(renderer: Renderer): void;
}

interface IObservable {
  observers: IObservers[];
  notifySpawn(spawnLocation: number): void;
  notifyMove(from: index, to: index): void;
  notifyReset();
  subscribe(observer: IObserver): void;
}
interface IObserver {
  onSet(y:number,x:number,value: number):void;
  onSpawn(spawnLocation: number): void;
  onMove(from: index, to: index): void;
  onReset(): void;
}
