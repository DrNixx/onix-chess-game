
import { AnalysisJudgment } from "./AnalysisJudgment";

export class AnalysisItem {
    public ply: number;

    public move: string;

    public eval?: number;

    public ceil?: number;

    public pawn?: number;

    public evalPawn?: number;

    public mate?: number;
    
    public best?: string;

    public variation?: string;

    public judgment?: AnalysisJudgment;

    public depth?: number;

    public time?: number;

    public constructor(raw) {
        this.ply = raw.ply;
        this.move = raw.move;
        this.eval = raw.eval;
        this.mate = raw.mate;
        this.best = raw.best;
        this.variation = raw.variation;
        this.depth = raw.depth;
        this.time = raw.time;

        if (raw.judgment) {
            this.judgment = new AnalysisJudgment(raw.judgment);
        }
    }

    public normalize(prev: number) {
        if (!this.eval) {
            this.eval = prev;
        }

        this.ceil = this.eval;
        if (this.ceil > 1000) {
            this.ceil = 1000;
        }

        if (this.ceil < -1000) {
            this.ceil = -1000;
        }

        this.evalPawn = this.eval / 100;
        this.pawn = this.ceil / 100;
    }
}