import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Role } from '../../utils/constants/role-enum';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {
  @Prop({ type: String, required: true })
  full_name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String })
  salt: string;

  @Prop({ type: Number })
  mentor_id?: number;

  @Prop({ type: Number })
  course_id?: number;

  @Prop({ enum: Role, default: Role.STUDENT })
  role: Role;
}

export const StudentSchema =
  SchemaFactory.createForClass(Student).plugin(softDeletePlugin);
