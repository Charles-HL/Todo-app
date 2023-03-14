import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TasksComponent } from './tasks.component';
import { ApiService } from 'src/app/core/services/api.service';
import { CheckboxData } from 'src/app/shared/models/checkbox/checkbox-data';
import { Task } from 'src/app/shared/models/dto/task';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let apiService: ApiService;

  const mockTasks: Task[] = [
    { id: 1, name: 'Task 1', done: false },
    { id: 2, name: 'Task 2', done: true },
    { id: 3, name: 'Task 3', done: false }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksComponent ],
      providers: [ ApiService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTasks() on initialization', () => {
    spyOn(apiService, 'getTasks').and.returnValue(of(mockTasks));

    fixture.detectChanges();

    expect(component.tasksUnDone).toEqual([mockTasks[0], mockTasks[2]]);
    expect(component.tasksDone).toEqual([mockTasks[1]]);
  });

  it('should update task state correctly', () => {
    spyOn(apiService, 'postIsTaskDone').and.returnValue(of(mockTasks[0]));

    fixture.detectChanges();

    const checkboxData: CheckboxData = { data_id: mockTasks[0].id, checked: true };
    component.taskStateUpdated(checkboxData);

    expect(component.tasksUnDone).toEqual([mockTasks[2]]);
    expect(component.tasksDone).toEqual([mockTasks[0], mockTasks[1]]);
  });
});
