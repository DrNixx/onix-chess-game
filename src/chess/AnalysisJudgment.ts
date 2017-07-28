
import { AnalysisGlyph } from "./AnalysisGlyph";

export class AnalysisJudgment {
    
    public glyph?: AnalysisGlyph = null;

    public name: string;

    public comment: string;

    public constructor(raw) {
        this.name = raw.name;
        this.comment = raw.comment;

        if (raw.glyph) {
            this.glyph = new AnalysisGlyph(raw.glyph);
        }
    }
}