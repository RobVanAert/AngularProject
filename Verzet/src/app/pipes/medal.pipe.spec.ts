import { MedalPipe } from './medal.pipe';

describe('MedalPipe', () => {
    it('should create medalPipe', () => {
        const pipe = new MedalPipe();
        expect(pipe).toBeTruthy();
    });

    it('should return a gold medal with 1', () => {
        const pipe = new MedalPipe();
        let medal = pipe.transform(1);
        expect(medal).toEqual('<p class="circle gold">1</p>');
    }) 

    it('should return a silver medal with 2', () => {
        const pipe = new MedalPipe();
        let medal = pipe.transform(2);
        expect(medal).toEqual('<p class="circle silver">2</p>');
    }) 

    it('should return a bronze medal with 3', () => {
        const pipe = new MedalPipe();
        let medal = pipe.transform(3);
        expect(medal).toEqual('<p class="circle bronze">3</p>');
    }) 

    it('should retun 4 with 4', () => {
        const pipe = new MedalPipe();
        let medal = pipe.transform(4);
        expect(medal).toEqual(4);
    })
});


