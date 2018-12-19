import { AlmoxarifeModule } from './almoxarife.module';

describe('AlmoxarifeModule', () => {
  let almoxarifeModule: AlmoxarifeModule;

  beforeEach(() => {
    almoxarifeModule = new AlmoxarifeModule();
  });

  it('should create an instance', () => {
    expect(almoxarifeModule).toBeTruthy();
  });
});
