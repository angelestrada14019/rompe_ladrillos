export class Paddle {
    private w: number = 0;
    private h: number = 0;
    private x: number = 0;
    private y: number = 0;
    
    private color = 'green';

    init(): void {
        this.resize();
    }

    resize(): void {
        this.w = window.innerWidth / 8;
        this.h = this.w / 5;

        this.x = (window.innerWidth - this.w) / 2;
        this.y = (window.innerHeight - this.h);
    };

    checkBounds(
        max: number ): void {

        const left =   this.x;
        const right =  this.x + this.w;

        if ( left <= 0 )             this.x = 0;
        if ( right >= max ) this.x = max - this.w;
    };

    move( 
        dx: number,
        max: number ): void {

        this.x += dx;
        this.checkBounds(
            max
        );
    };

    paint( 
        ctx: CanvasRenderingContext2D ): void {
        
        ctx.fillStyle = this.color;
        ctx.fillRect( this.x, this.y, this.w, this.h );
    };

    getWidth(): number {
        return this.w;
    }
    getHeight(): number {
        return this.h;
    }

    getPosX(): number {
        return this.x;
    }

    getPosY(): number {
        return this.y;
    }
}
