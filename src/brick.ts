import { Wall } from './wall';

export class Brick {

    private width: number;
    private height: number;
    
    private color: string = 'orangered';
    private _visible: boolean = true;

    constructor(
        private row: number,
        private col: number ) {
    }

    resize(): void {
        this.width = (window.innerWidth 
            - (Wall.BRICKS_PER_ROW - 1) * Wall.GAP) / Wall.BRICKS_PER_ROW;
        this.height = this.width / 4;    
    }

    paint( 
        ctx: CanvasRenderingContext2D ): void {
     
        if ( this.visible ) {
            const x = this.col * (this.width + Wall.GAP);
            const y = this.row * (this.height + Wall.GAP);

            ctx.fillStyle = this.color;
            ctx.fillRect( x, y, this.width, this.height );
        }
        else {
            // NOOP
        }
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getPosX(): number {
        return this.col * (this.width + Wall.GAP);
    }

    getPosY(): number {
        return this.row * (this.height + Wall.GAP);
    }

    get visible(): boolean {
        return this._visible;
    }

    set visible( 
        v: boolean ) {
        
        this._visible = v;
    }
}
