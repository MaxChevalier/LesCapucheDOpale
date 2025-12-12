import { validate } from 'class-validator';
import { FinishQuestDto } from '../dto/finish-quest.dto';

describe('FinishQuestDto', () => {
  it('should pass validation with valid restDurationDays', async () => {
    const dto = new FinishQuestDto();
    dto.restDurationDays = 3;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation with restDurationDays = 0', async () => {
    const dto = new FinishQuestDto();
    dto.restDurationDays = 0;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation with negative restDurationDays', async () => {
    const dto = new FinishQuestDto();
    dto.restDurationDays = -1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should fail validation with non-integer restDurationDays', async () => {
    const dto = new FinishQuestDto();
    dto.restDurationDays = 3.5;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isInt');
  });

  it('should fail validation when restDurationDays is missing', async () => {
    const dto = new FinishQuestDto();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
