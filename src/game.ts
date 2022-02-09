import { Ball } from './ball';
import { Canvas } from './canvas';
import { Paddle } from './paddle';
import { Player } from './player';
import { Wall } from './wall';

// Immutable Class
export class Game {

    private canvas: Canvas;
    private wall:   Wall;
    private ball:   Ball;
    private paddle: Paddle;
    private player: Player;
    
    private paused: boolean;

    private static readonly instance: Game = new Game(
        '1.1'
    );

    static getInstance(): Game {
        return Game.instance;
    } 

    private constructor(
        private _version: string ) {

        this.canvas = new Canvas();
        this.wall   = new Wall();
        this.ball   = new Ball();
        this.paddle = new Paddle();
        this.player = new Player();
    }

    init(): void {
        this.canvas.init();
        this.wall.init();
        this.paddle.init();
        this.ball.init(this.paddle);
        this.player.init();

        window.onresize = this.resize
            .bind(
                this
            );
    
        window.onkeydown = this.keydown
            .bind(
                this
            );

        // initial paint
        this.paint();
    }
    
    paint(): void {
        
        
        if ( this.player.numLives() == 0 ) {
            document.title = 'GAME OVER ['
                + this.player.getPoints()
                + ' POINTS]';
            return;
        }
        if ( this.player.getPoints() == this.wall.getBricks().length ) {
            document.title = ' YOU WIN ['
                + this.player.getPoints()
                + ' POINTS]';
            window.alert('YOU WIN!');
            return;
        }

        if ( this.paused ) {
            return;
        }

        const ctx = this.canvas.context; 
        if ( ctx ) { 
            this.canvas.clear( ctx );
            this.wall.paint( ctx );
            this.paddle.paint( ctx );
            
            if ( this.ball.paint( this.canvas ) ) {            
                this.detectCollisions();
            }
            else {
                this.player.decLives();
                this.ball.init(this.paddle);

                this.paused = true;
            }

            window.requestAnimationFrame(this.paint.bind(this));
              
        }
    }

    get version(): string {
        return this._version;
    }

    // private methods ------------------------------------------------------

    private resize(): void { 
        this.canvas.resize();
        this.wall.resize();
        this.ball.resize();
        this.paddle.resize();
    }

    private detectBallWallCollision(): void {
        const bricksHit = this.wall
            .detectBallCollision( 
                this.ball 
            );

        this.player
            .incPoints(
                bricksHit
            );

        document.title = this.player.getName() 
            + ' ['
            + this.player.getPoints()
            + ' POINTS]';
    }
    
    private detectCollisions(): void {
        if ( this.ball.detectPaddleCollision( 
            this.paddle ) ) {

            return;
        }
        
        this.detectBallWallCollision();
    }

    private keydown( 
        e: KeyboardEvent ): void {

        e.preventDefault();         // do not bubble

        if ( e.code == 'Space' ) {
            this.paused = !this.paused;

            if ( !this.paused ) {
                window.requestAnimationFrame(
                    this.paint
                        .bind(
                            this
                        )
                );
            }
        }
        else if ( e.code == 'ArrowLeft' ) {
            this.paddle
                .move( 
                    -40, 
                    this.canvas.width 
                );
        }
        else if ( e.code == 'ArrowRight' ) {
            this.paddle
                .move( 
                    +40, 
                    this.canvas.width
                );
        }
    };
}
