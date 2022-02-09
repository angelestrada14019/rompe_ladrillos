export class Player {

    private name: string = 'Jugador';
    private points: number = 0;
    private lives: number = 3;
    
    init(): void {
        const userName: string = window.prompt(
            'Ingresa tu nombre:', 
            this.name
        );

        if ( userName != null && userName.length > 0 ) {
            this.name = userName;
        }

        document.title = this.name;
    }

    incPoints( 
        inc: number ): void {
            
        this.points += inc;
    }

    getPoints(): number {
        return this.points;
    }

    decLives(): void {
        this.lives--;
    }

    numLives(): number {
        return this.lives;
    }

    getName(): string {
        return this.name;
    }
}
