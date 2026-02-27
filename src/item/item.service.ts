import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Item } from "./entities/item.entity";
import { Model } from "mongoose";

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}
  async create(createItemDto: CreateItemDto) {
    const item = await this.itemModel.create(createItemDto);
    return await item.save();
  }

  async findAll() {
    return await this.itemModel.find().exec();
  }

  async findOne(id: number) {
    const foundItem = await this.itemModel.findById(id).exec();

    if (!foundItem) throw new NotFoundException("item not found");
    return foundItem;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const foundItem = await this.itemModel.findById(id).exec()

    if(!foundItem) throw new NotFoundException("itwm not found")
    return  await this.itemModel.findByIdAndUpdate(id, updateItemDto, {new: true}).exec()
  }

async  remove(id: number) {
  const foundItem = await this.itemModel.findById(id).exec()

  if(!foundItem) throw new NotFoundException("item not found")

    return await this.itemModel.findByIdAndDelete(id).exec()
}
}
