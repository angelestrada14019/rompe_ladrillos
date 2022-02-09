export class Canvas {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    init(): void {
        this.canvas = document.createElement( 
            'canvas'
        );
        document.body.appendChild(
            this.canvas
        );

        this.canvas
            .style
            .backgroundColor = '#f0db4f';

        this.ctx = this.canvas.getContext( 
            '2d' 
        );

        this.resize();
    }

    clear( 
        ctx: CanvasRenderingContext2D )  {

        ctx.fillStyle = this.canvas.style.backgroundColor;
        ctx.fillRect( 
            0, 
            0, 
            this.canvas.width, 
            this.canvas.height 
        );
    };

    get context() {
        return this.ctx;
    }

    get width() {
        return this.canvas.width;
    }

    get height(): number {
        return this.canvas.height;
    }

    resize(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}
