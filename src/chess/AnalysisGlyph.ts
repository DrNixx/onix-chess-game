
export class AnalysisGlyph {
    
    public name: string;
    
    public symbol: string;

    public constructor(raw) {
        this.name = raw.name;
        this.symbol = raw.symbol;
    }
}