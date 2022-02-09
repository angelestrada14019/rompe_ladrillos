import { Brick } from './brick';
import { Canvas } from './canvas';
import { Paddle } from './paddle';

export class Ball {

    private x: number = 0;
    private y: number = 0;
    private dx: number = 3;     // start moving right 
    private dy: number = 3;     // start moving down
    private r: number = 0;
    
    private color: string = 'blue';

    init(paddle:Paddle): void {
        this.resize();
        this.x = window.innerWidth/2;      // NEW
        this.y = window.innerHeight/2;     // NEW
    }

    resize(): void {
        this.r = window.innerWidth / 50;
    };

    checkBounds(
        canvas: Canvas ): boolean {

        const left =   this.x - this.r;
        const right =  this.x + this.r;
        const top =    this.y - this.r;
        const bottom = this.y + this.r;

        if ( left <= 0 )             this.dx = -this.dx;
        if ( right >= canvas.width ) this.dx = -this.dx;
        if ( top <= 0 )              this.dy = -this.dy;

        if ( bottom >= canvas.height ) {
            return false;
        }

        return true;
    };

    paint( 
        canvas: Canvas ): boolean {

        const ctx: CanvasRenderingContext2D = canvas.context;

        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc( 
            this.x,
            this.y,
            this.r,
            0,
            2 * Math.PI,
        );
        ctx.fill();
        ctx.closePath();
        
        return this.move(
            canvas
        );
    };

    invertDeltaY(): void {
        this.dy = -this.dy;
    }
    invertDeltaX(): void {
        this.dx = -this.dx;
    }

    detectPaddleCollision( 
        paddle: Paddle ): boolean {

        if ( this.dy < 0 ) {
            // going up
            return false;
         }
    
        const ballLeft   = this.x;
        const ballRight  = this.x;
        const ballBottom = this.y + this.r;
    
        const paddleLeft  = paddle.getPosX();
        const paddleRight = paddle.getPosX() + paddle.getWidth();
        const paddleTop   = paddle.getPosY();
    
        const collision = ballBottom > paddleTop
            && ballBottom <= (paddleTop + paddle.getHeight())
            && ballLeft >= paddleLeft
            && ballRight <= paddleRight;

        if ( collision ) {
            console.log( 'collision' );
            
            let puntoGolpeEnPaddle= ballLeft - (paddleLeft + paddle.getWidth()/2); 
            puntoGolpeEnPaddle = puntoGolpeEnPaddle / (paddle.getWidth()/2);//entre -1 y 1
            let angulo=puntoGolpeEnPaddle*(Math.PI/3);//multiplicar por 60 grados que seria el maximo en los bordes
            this.dx=4*Math.sin(angulo);
            this.dy=-4*Math.cos(angulo);
            
        }

        return collision;
    }

    hitsBrick( 
        brick: Brick ): boolean {

        if ( this.bottomBrickCollision( brick ) ) {
            this.invertDeltaY(); 
            return true;
        }
        // TODO
        if ( this.topBrickCollision( brick ) ) {
                        
            this.invertDeltaY();
            return false;
         }
        if ( this.leftBrickCollision( brick ) ) {
            this.invertDeltaX();
            return true;
        }
        if ( this.rightBrickCollision( brick ) ) {
            this.invertDeltaX();
            return true;
        }
                
        return false;
    }

    // private methods ------------------------------------------------------

    private move(
        canvas: Canvas ): boolean {

        this.x += this.dx;
        this.y += this.dy;

        return this.checkBounds(
            canvas 
        );
    };

    private bottomBrickCollision(
        brick: Brick ): boolean {
    
        const brickBottom = brick.getPosY() + brick.getHeight();
        const brickLeft   = brick.getPosX();
        const brickRight  = brick.getPosX() + brick.getWidth();

        const ballTop = this.y - this.r;

        return this.x >= brickLeft
            && this.x <= brickRight
            && ballTop <= brickBottom
            && this.dy < 0;            // ball is going up
    }
    private topBrickCollision( 
        brick: Brick ): boolean {

        const brickTop = brick.getPosY();
        const brickLeft   = brick.getPosX();
        const brickRight  = brick.getPosX() + brick.getWidth();
        const brickBottom = brick.getPosY() + brick.getHeight();
    
        const ballBotton = this.y + this.r;
        const ballTop = this.y - this.r;
    
        return (this.x + this.r) > brickLeft
            && (this.x - this.r) < brickRight
            && ballBotton > brickTop
            && ballTop <= brickBottom
            && this.dy > 0;            // ball is going down
    }
    private leftBrickCollision(
        brick: Brick ): boolean {

            const brickTop = brick.getPosY();
            const brickLeft   = brick.getPosX();
            const brickRight  = brick.getPosX() + brick.getWidth();
            const brickBottom = brick.getPosY() + brick.getHeight();
        
            const ballBotton = this.y + this.r;
            const ballTop = this.y - this.r;
        
            return (this.x + this.r) > brickLeft
                && (this.x - this.r) < brickRight
                && ballBotton > brickTop
                && ballTop <= brickBottom
                && this.dx > 0;             // ball is going right
    }
    private rightBrickCollision(
        brick: Brick ): boolean {

            const brickTop = brick.getPosY();
            const brickLeft   = brick.getPosX();
            const brickRight  = brick.getPosX() + brick.getWidth();
            const brickBottom = brick.getPosY() + brick.getHeight();
        
            const ballBotton = this.y + this.r;
            const ballTop = this.y - this.r;
        
            return (this.x + this.r) > brickLeft
                && (this.x - this.r) < brickRight
                && ballBotton > brickTop
                && ballTop <= brickBottom
                && this.dx < 0;             // ball is going left
    }
}
