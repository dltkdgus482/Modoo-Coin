import image_lv05 from '@/assets/images/character_lv05.png';
import image_lv10 from '@/assets/images/character_lv10.png';
import image_lv15 from '@/assets/images/character_lv15.png';

export const findCharacter = (level) => {
    if (level <= 5) return image_lv05;
    else if (level <= 10) return image_lv10;
    else return image_lv15;
}