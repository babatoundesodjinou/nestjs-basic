/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
 todos: Todo[] = [
    {
        id: 1,
        title: 'todos app',
        description: 'Craete NestJS todos app',
        done: false
    },
    {
        id: 2,
        title: 'bread',
        description: 'buy bread',
        done: true
    },
    {
        id: 3,
        title: 'win',
        description: 'french red wine',
        done: true
    }
 ]

 findOne(id: string){
    return this.todos.find(todo => todo.id === Number(id));
 }

 findAll(): Todo[]{
    return this.todos;
 }

 create(todo: CreateTodoDto){
    this.todos = [...this.todos, todo];
 }

 update(id: string, todo: CreateTodoDto){
    const todoToUpdate = this.todos.find(t => t.id === +id);
    if (!todoToUpdate) {
        return new NotFoundException('booooo did you find this todo');
    }

    if (todo.hasOwnProperty('done')) {
        todoToUpdate.done = todo.done;
    }

    if (todo.title) {
        todoToUpdate.title = todo.title;
    }
    
    if (todo.description) {
        todoToUpdate.description = todo.description;
    }

    const updatedTodos = this.todos.map(t => t.id !== +id ? t : todoToUpdate);
    this.todos = [...updatedTodos];
    return { updatedTodo: 1, todo: todoToUpdate};
 }

 delete(id: string){
    const nbOfTodoBeforeDelete = this.todos.length;
    this.todos = [...this.todos.filter(t => t.id !== +id)];
    const currentNbTodo = this.todos.length


    if (currentNbTodo < nbOfTodoBeforeDelete) {
        return {deleteTodo: 1, nbTodos: currentNbTodo}
    } else {
        return {deleteTodo: 0, nbTodos: currentNbTodo}
    }
 }
}
