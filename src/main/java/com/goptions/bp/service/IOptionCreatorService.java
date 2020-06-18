package com.goptions.bp.service;

import com.goptions.bp.exceptions.GOptionsException;
import com.goptions.bp.model.option.Option;
import com.goptions.bp.model.option.creator.FramesContainer;
import com.goptions.bp.model.option.creator.OptionCreator;

import java.util.List;

/**
 * Created by matvei on 3/7/15.
 */

public interface IOptionCreatorService {

    void delete(OptionCreator optionCreator);

    List<Option> generateOptions(Long creatorId) throws GOptionsException;

    void cancelGeneratedOption(Long creatorId) throws GOptionsException;

    OptionCreator update(Long id, FramesContainer framesContainer) throws GOptionsException;

    OptionCreator create(FramesContainer framesContainer) throws GOptionsException;

    OptionCreator read(Long id);

    List<OptionCreator> getAllCreators();
}
