import { PanelsService } from '../src/lib/panels.service';
import { Injectable } from "@angular/core";

@Injectable()
export class MockPanelsService implements Partial<PanelsService> {}
