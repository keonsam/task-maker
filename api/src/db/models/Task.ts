import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  timestamps: true,
})
export default class Task extends Model {
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column
  assignee: string;

  @Column
  description: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  dueDate: Date;

  @Column
  notes: string;

  @AllowNull(false)
  @Column(DataType.ENUM("low", "medium", "high"))
  priorityLevel: string;

  @AllowNull(false)
  @Column(DataType.ENUM("pending", "in progress", "completed", "canceled"))
  status: string;

  @AllowNull(false)
  @Column
  title: string;
}
