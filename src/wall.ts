import { Ball } from './ball';
import { Brick } from './brick';

export class Wall {
    static readonly BRICKS_PER_ROW: number = 5;
    static readonly NUM_ROWS: number = 3;
    static readonly GAP: number = 5;
    
    private bricks: Brick[];

    constructor() {
        this.bricks = [];
    }

    init(): void {
        for ( let row: number = 0; row < Wall.NUM_ROWS; row++ ) {
            for ( let col: number = 0; col < Wall.BRICKS_PER_ROW; col++ ) {
                this.bricks.push( 
                    new Brick( row, col )
                );
            }
        }

        // initial resize
        this.resize();
    }
    public getBricks(): Brick[] {
        return this.bricks;
    }

    paint( 
        ctx: CanvasRenderingContext2D ): void {
        
        this.bricks
            .forEach( (brick) => brick.paint( ctx ) ); 
    };

    resize(): void {
        this.bricks
            .forEach( (brick) => brick.resize() );
    }

    detectBallCollision( 
        ball: Ball ): number {
        
        let bricksDown = 0;
        
        this.bricks.forEach( (brick) => {
            if ( brick.visible ) {
                if ( ball.hitsBrick( brick ) ) {
                    brick.visible = false;
                    bricksDown++;
                }
            }
            else {
                // skip it
            }
        });
        
        return bricksDown;
    }
}
